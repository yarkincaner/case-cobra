'use client'

import PhonePreview from '@/components/PhonePreview'
import Icons from '@/components/ui/icons'
import { useGetPaymentStatus } from '@/lib/queries'
import { formatPrice } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

type Props = {}

const ThankYou: FC<Props> = ({}) => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || ''

  const { data } = useGetPaymentStatus({ orderId: Number(orderId) })

  if (data === undefined) {
    return (
      <div className='mt-24 flex w-full justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Icons.loader className='size-4 animate-spin text-muted-foreground' />
          <h3 className='text-xl font-semibold'>Loading your order...</h3>
          <p>This won't take long.</p>
        </div>
      </div>
    )
  }

  if (data === false) {
    return (
      <div className='mt-24 flex w-full justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Icons.loader className='size-4 animate-spin text-muted-foreground' />
          <h3 className='text-xl font-semibold'>Verifying your payment...</h3>
          <p>This might take a moment.</p>
        </div>
      </div>
    )
  }

  const { configuration, BillingAddress, ShippingAddress, amount } = data
  const { color, croppedImageUrl } = configuration

  return (
    <div className='bg-background'>
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='max-w-xl'>
          <p className='text-base font-medium text-primary'>Thank you!</p>
          <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
            Your case is on the way!
          </h1>
          <p className='mt-2 text-base text-muted-foreground'>
            We've received your order and are now processing it.
          </p>
          <div className='mt-12 text-sm font-medium'>
            <p className='text-foreground'>Order number</p>
            <p className='mt-2 text-muted-foreground'>{orderId}</p>
          </div>
        </div>
        <div className='mt-10 border-t border-muted'>
          <div className='mt-10 flex flex-auto flex-col'>
            <h4 className='font-semibold text-foreground'>
              You made a great choice!
            </h4>
            <p className='mt-2 text-sm text-muted-foreground'>
              We at CaseCobra believe that a phone case doesn't only need to
              look good, but also last you for the years to come. We offer a
              5-year print guarantee: If your case isn't of the highest quality,
              we'll replace it for free.
            </p>
          </div>
        </div>
        <div className='mt-4 flex space-x-6 overflow-hidden rounded-xl bg-muted/50 ring-1 ring-inset ring-muted-foreground/10 lg:rounded-2xl'>
          <PhonePreview color={color!} croppedImageUrl={croppedImageUrl!} />
        </div>
        <div>
          <div className='grid grid-cols-2 gap-x-6 py-10 text-sm'>
            <div>
              <p className='font-medium text-foreground'>Shipping address</p>
              <div className='mt-2 text-muted-foreground'>
                <address className='not-italic'>
                  <span className='block'>{ShippingAddress?.name}</span>
                  <span className='block'>{ShippingAddress?.street}</span>
                  <span className='block'>
                    {ShippingAddress?.postalCode} {ShippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className='font-medium text-foreground'>Billing address</p>
              <div className='mt-2 text-muted-foreground'>
                <address className='not-italic'>
                  <span className='block'>{BillingAddress?.name}</span>
                  <span className='block'>{BillingAddress?.street}</span>
                  <span className='block'>
                    {BillingAddress?.postalCode} {BillingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-x-6 border-t border-muted py-10 text-sm'>
            <div>
              <p className='font-medium text-foreground'>Payment status</p>
              <p className='mt-2 text-muted-foreground'>Paid</p>
            </div>
            <div>
              <p className='font-medium text-foreground'>Shipping Method</p>
              <p className='mt-2 text-muted-foreground'>
                DHL, takes up to 3 working days
              </p>
            </div>
          </div>
        </div>
        <div className='space-y-6 border-t border-muted pt-10 text-sm'>
          <div className='flex justify-between'>
            <p className='font-medium text-foreground'>Subtotal</p>
            <p className='text-muted-foreground'>{formatPrice(amount)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-foreground'>Shipping</p>
            <p className='text-muted-foreground'>{formatPrice(0)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-foreground'>Total</p>
            <p className='text-muted-foreground'>{formatPrice(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYou
