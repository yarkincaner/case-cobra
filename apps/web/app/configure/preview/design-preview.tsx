import Phone from '@/components/Phone'
import { Button } from '@/components/ui/buttons/button'
import Icons from '@/components/ui/icons'
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { cn, formatPrice } from '@/lib/utils'
import { COLORS, MODELS } from '@/lib/validators/option-validator'
import { Database } from '@/types/supabase'
import { FC } from 'react'

const HIGHLIGHTS = [
  'Wireless charging compatible',
  'TPU shock absorption',
  'Packaging made from recycled materials',
  '5 year print warranty'
]

const MATERIALS = [
  'High-qualty, durable material',
  'Scratch and fingerprint resistant coating'
]

type Props = {
  configuration: Database['public']['Tables']['configuration']['Row']
}

const DesignPreview: FC<Props> = ({ configuration }) => {
  const { croppedImageUrl, color, model, finish, material } = configuration

  const tw = COLORS.find(supportedColor => supportedColor.value === color)?.tw
  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!

  let totalPrice = BASE_PRICE
  if (material === 'polycarbonate')
    totalPrice += PRODUCT_PRICES.material.polycarbonate
  if (finish === 'textured') totalPrice += PRODUCT_PRICES.finish.textured

  return (
    <>
      <div className='my-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
        <div className='sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2'>
          <Phone
            imgSrc={croppedImageUrl!}
            className={cn(
              `bg-${tw} rounded-[4.1rem] sm:rounded-[1.8rem] md:rounded-2xl lg:rounded-3xl xl:rounded-[2rem]`
            )}
          />
        </div>
        <div className='mt-6 sm:col-span-9 sm:mt-0 md:row-end-1'>
          <h3 className='text-3xl font-bold tracking-tight text-foreground'>
            Your {modelLabel} Case
          </h3>
          <div className='mt-3 flex items-center gap-1.5 text-base'>
            <Icons.check className='size-4 text-primary' />
            In stock and ready to ship
          </div>
        </div>
        <div className='text-base sm:col-span-12 md:col-span-9'>
          <div className='grid grid-cols-1 gap-y-8 border-b border-muted py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
            <div>
              <p className='font-medium text-foreground'>Highlights</p>
              <ol className='mt-3 list-inside list-disc text-muted-foreground'>
                {HIGHLIGHTS.map(highlight => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ol>
            </div>
            <div>
              <p className='font-medium text-foreground'>Materials</p>
              <ol className='mt-3 list-inside list-disc text-muted-foreground'>
                {MATERIALS.map(material => (
                  <li key={material}>{material}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className='mt-8'>
            <div className='bg-secondary/25 p-6 sm:rounded-lg sm:p-8'>
              <div className='flow-root text-sm'>
                <div className='mt-2 flex items-center justify-between py-1'>
                  <p className='text-muted-foreground'>Base price</p>
                  <p className='font-medium text-foreground'>
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>
                {finish === 'textured' ? (
                  <div className='mt-2 flex items-center justify-between py-1'>
                    <p className='text-muted-foreground'>Textured finish</p>
                    <p className='font-medium text-foreground'>
                      {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}
                {material === 'polycarbonate' ? (
                  <div className='mt-2 flex items-center justify-between py-1'>
                    <p className='text-muted-foreground'>
                      Soft polycarbonate material
                    </p>
                    <p className='font-medium text-foreground'>
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                    </p>
                  </div>
                ) : null}

                <div className='my-2 h-px bg-muted' />

                <div className='flex items-center justify-between py-2'>
                  <p className='font-semibold text-foreground'>Order total</p>
                  <p className='font-semibold text-foreground'>
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-8 flex justify-end'>
              <Button className='px-4 sm:px-6 lg:px-8'>
                Check out <Icons.arrowRight className='ml-1.5 inline size-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesignPreview
