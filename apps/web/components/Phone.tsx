import { cn } from '@/lib/utils'
import { FC, HTMLAttributes } from 'react'

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
        src={'/phone-template.png'}
        className='pointer-events-none z-40 select-none'
        alt='phone image'
      />
      <div className='absolute inset-0 -z-10'>
        <img
          src={imgSrc}
          className='min-h-full min-w-full rounded-[4.1rem] object-cover p-[0.1rem] sm:rounded-[1.8rem] md:rounded-2xl lg:rounded-3xl xl:rounded-[2rem]'
          alt='overlaying phone image'
        />
      </div>
    </div>
  )
}

export default Phone
