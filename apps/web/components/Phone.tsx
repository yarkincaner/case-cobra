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
        'pointer-events-none relative z-40 overflow-hidden',
        className
      )}
      {...props}
    >
      <img
        src={'/phone-template-white-edges.png'}
        className='pointer-events-none z-40 select-none dark:hidden'
        alt='phone image'
      />
      <img
        src={'/phone-template-dark-edges.png'}
        className='pointer-events-none z-40 hidden select-none dark:block'
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
