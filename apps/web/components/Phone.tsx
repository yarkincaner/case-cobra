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
          className='rounded-[2.4rem] object-cover p-[0.1rem]'
          alt='overlaying phone image'
        />
      </div>
    </div>
  )
}

export default Phone
