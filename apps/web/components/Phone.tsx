'use client'

import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { FC, HTMLAttributes } from 'react'

type Props = {
  imgSrc: string
} & HTMLAttributes<HTMLDivElement>

const Phone: FC<Props> = ({ className, imgSrc, ...props }) => {
  const { resolvedTheme } = useTheme()
  let src

  switch (resolvedTheme) {
    case 'light':
      src = '/phone-template-white-edges.png'
      break
    case 'dark':
      src = '/phone-template-dark-edges.png'
    default:
      src = '/phone-template-dark-edges.png'
      break
  }

  return (
    <div
      className={cn(
        'pointer-events-none relative z-40 overflow-hidden',
        className
      )}
      {...props}
    >
      <img
        src={src}
        className='pointer-events-none z-40 select-none'
        alt='phone image'
      />
      <div className='absolute inset-0 -z-10'>
        <img
          src={imgSrc}
          className='min-h-full min-w-full object-cover'
          alt='overlaying phone image'
        />
      </div>
    </div>
  )
}

export default Phone
