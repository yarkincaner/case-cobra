import { createClient } from '@/lib/db/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import OrderReceivedEmail from '@/components/emails/OrderReceivedEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  if (typeof process.env.STRIPE_WEBHOOK_SECRET === 'undefined') {
    throw new Error('Environment variable STRIPE_WEBHOOK_SECRET is missing!')
  }

  try {
    const body = await req.text()
    const signature = headers().get('stripe-signature')

    // if request is not coming from stripe
    if (!signature) {
      return new NextResponse('Invalid signature', {
        status: 400
      })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email')
      }

      const session = event.data.object as Stripe.Checkout.Session

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null
      }

      if (!userId || !orderId) {
        throw new Error('Invalid request metadata!')
      }

      const billingAddress = session.customer_details!.address
      const shippingAddress = session.shipping_details!.address

      const db = createClient()

      const { data: db_shippingAddress, error: shippingAddressError } = await db
        .from('ShippingAddress')
        .insert({
          name: session.customer_details!.name!,
          city: shippingAddress!.city!,
          country: shippingAddress!.country!,
          postalCode: shippingAddress!.postal_code!,
          street: shippingAddress!.line1!,
          state: shippingAddress!.state
        })
        .select('id')

      if (shippingAddressError) {
        throw new Error(shippingAddressError.message)
      }

      const { data: db_billingAddress, error: billingAddressError } = await db
        .from('BillingAddress')
        .insert({
          name: session.customer_details!.name!,
          city: billingAddress!.city!,
          country: billingAddress!.country!,
          postalCode: billingAddress!.postal_code!,
          street: billingAddress!.line1!,
          state: billingAddress!.state
        })
        .select('id')

      if (billingAddressError) {
        throw new Error(billingAddressError.message)
      }

      const { data: updatedOrder, error: updateOrderError } = await db
        .from('Order')
        .update({
          isPaid: true,
          shippingAddress: db_shippingAddress[0].id,
          billingAddress: db_billingAddress[0].id
        })
        .eq('id', orderId)
        .select('id, created_at')

      if (updateOrderError) {
        throw new Error(updateOrderError.message)
      }

      await resend.emails.send({
        from: `CaseCobra <${process.env.ADMIN_EMAIL}>`,
        to: [event.data.object.customer_details.email],
        subject: 'Thanks for your order!',
        react: OrderReceivedEmail({
          orderId: updatedOrder[0].id,
          orderDate: updatedOrder[0].created_at,
          // @ts-ignore
          shippingAddress: {
            name: session.customer_details!.name!,
            city: shippingAddress!.city!,
            country: shippingAddress!.country!,
            postalCode: shippingAddress!.postal_code!,
            street: shippingAddress!.line1!,
            state: shippingAddress!.state
          }
        })
      })
    }

    return NextResponse.json({
      result: event,
      ok: true
    })
  } catch (error) {
    // Optionally: send this to sentry
    console.error(error)

    return NextResponse.json(
      {
        message: 'Something went wrong!',
        ok: false
      },
      {
        status: 500
      }
    )
  }
}
