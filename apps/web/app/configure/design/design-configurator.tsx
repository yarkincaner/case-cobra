'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FC } from 'react'

type Props = {
  imageUrl: string
  imageDimensions: {
    width: number
    height: number
  }
}

const DesignConfigurator: FC<Props> = ({ imageUrl, imageDimensions }) => {
  return (
    <div className='relative mb-20 mt-20 grid grid-cols-3 pb-20'>
      <div className='relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
        {/* aspect ratio 896/1831 comes from phone image ratio */}
        <div className='pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50'>
          <AspectRatio
            ratio={896 / 1831}
            className='pointer-events-none relative z-50 aspect-[896/1831] w-full'
          >
            <Image
              fill
              alt='phone image'
              src={'/phone-template.png'}
              className='pointer-events-none z-50 select-none'
            />
          </AspectRatio>
          <div className='absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
          <div
            className={cn(
              'absolute inset-0 bottom-px left-[3px] right-[3px] top-px rounded-[32px]',
              `bg-blue-950`
            )}
          />
        </div>
        <div className='relative size-full'>
          <Image
            src={imageUrl}
            fill
            alt='your image'
            className='pointer-events-none'
          />
        </div>
      </div>
    </div>
  )
}

export default DesignConfigurator
