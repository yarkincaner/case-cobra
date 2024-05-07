import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, ReactNode } from 'react'

type Props = {
  imgSrc: string
  dark?: boolean
} & HTMLAttributes<HTMLDivElement>

const Phone: FC<Props> = ({ className, imgSrc, dark = false, ...props }) => {
  return (
    <div
      className={cn(
        'pointer-events-none relative z-50 overflow-hidden',
        className
      )}
      {...props}
    >
      <img
        src={
          dark
            ? '/phone-template-dark-edges.png'
            : '/phone-template-white-edges.png'
        }
        className='pointer-events-none z-50 select-none'
        alt='phone image'
      />
      <div className='absolute inset-0 -z-10'>
        <img
          src={imgSrc}
          className='object-cover'
          alt='overlaying phone image'
        />
      </div>
    </div>
  )
}

export default Phone
