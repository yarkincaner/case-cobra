'use server'

import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { createClient } from '@/lib/db/server'
import { stripe } from '@/lib/stripe'
import { Tables } from '@/types/supabase'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const db = createClient()

type CheckoutArgs = {
  configurationId: number
}

export const createCheckoutSession = async ({
  configurationId
}: CheckoutArgs) => {
  const { data: configuration, error } = await db
    .from('configuration')
    .select('*')
    .eq('id', configurationId)

  if (error) {
    throw new Error(error.message)
  }

  const {
    data: { user },
    error: authError
  } = await db.auth.getUser()

  if (!user || authError) {
    return redirect('/sign-in')
  }

  const { finish, material } = configuration[0]
  let price = BASE_PRICE
  if (finish === 'textured') price += PRODUCT_PRICES.finish.textured
  if (material === 'polycarbonate')
    price += PRODUCT_PRICES.material.polycarbonate

  let order: Tables<'Order'> | undefined = undefined

  const { data: existingOrder, error: existingOrderError } = await db
    .from('Order')
    .select('*')
    .eq('configuration', configurationId)
    .eq('user', user.id)

  if (existingOrderError) {
    throw new Error(existingOrderError.message)
  }

  if (existingOrder.length > 0) {
    order = existingOrder[0]
  } else {
    const orderInsertion = await db
      .from('Order')
      .insert({
        amount: price / 100,
        user: user.id,
        configuration: configurationId
      })
      .select('*')

    if (orderInsertion.error) {
      throw new Error(orderInsertion.error.message)
    }
    order = orderInsertion.data[0]
  }

  const product = await stripe.products.create({
    name: 'Custom iPhone Case',
    images: [configuration[0].imageUrl],
    default_price_data: {
      currency: 'USD',
      unit_amount: price
    }
  })

  const origin = headers().get('origin')

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${origin}/thank-you?orderId=${order.id}`,
    cancel_url: `${origin}/configure/preview?id=${configurationId}`,
    // Error: The payment method type "paypal" is invalid.
    // payment_method_types: ['card', 'paypal'],
    payment_method_types: ['card'],
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['TR', 'US', 'DE']
    },
    metadata: {
      userId: user.id,
      orderId: order.id
    },
    line_items: [
      {
        price: product.default_price as string,
        quantity: 1
      }
    ]
  })

  return { url: stripeSession.url }
}

export const getPaymentStatus = async ({ orderId }: { orderId: number }) => {
  const {
    data: { user },
    error: authError
  } = await db.auth.getUser()

  if (authError || !user) {
    throw new Error('You need to be logged in to view this page!')
  }

  const { data: order, error: orderError } = await db
    .from('Order')
    .select('*, configuration(*), BillingAddress(*), ShippingAddress(*)')
    .eq('id', orderId)
    .maybeSingle()

  if (orderError) {
    throw new Error(orderError.message)
  }

  if (!order) {
    throw new Error('This order does not exist!')
  }

  if (order.isPaid === false) {
    return false
  }

  return order
}
