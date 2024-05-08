import { FC } from 'react'
import Phone from '@/components/Phone'
import Icons from '@/components/ui/icons'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/buttons/button'

const CHECMARKS = [
  'High-quality silicone material',
  'Scratch and fingerprint resistant coating',
  'Wireless charging compatible',
  '5 year print warranty'
]

type Props = {}

const CreateYourCase: FC<Props> = ({}) => {
  return (
    <>
      <div className='mb-12 px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl sm:text-center'>
          <div className='flex flex-col items-center gap-4 sm:gap-6 lg:flex-row'>
            <h2 className='order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight md:text-6xl'>
              Upload your photo and get{' '}
              <span className='relative bg-primary px-2 text-primary-foreground'>
                your own case
              </span>{' '}
              now
            </h2>
            <img src='/snake-2.png' className='order-[0] w-24 lg:order-2' />
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-6xl px-6 lg:px-8'>
        <div className='relative flex grid-cols-2 flex-col items-center gap-40 md:grid'>
          <img
            src='/arrow.png'
            className='absolute left-1/2 top-[25rem] z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 md:top-1/2 md:rotate-0'
          />
          <div className='relative h-80 w-full max-w-sm rounded-xl bg-secondary ring-inset ring-secondary md:h-full md:justify-self-end lg:rounded-2xl'>
            <img
              src='/horse.jpg'
              className='h-full w-full rounded-md bg-background object-cover shadow-2xl ring-1 ring-secondary'
            />
          </div>
          <Phone className='w-60' imgSrc='/horse_phone.jpg' />
        </div>
      </div>
      <ul className='mx-auto mt-12 w-fit max-w-prose space-y-2 sm:text-lg'>
        {CHECMARKS.map((checkmark, index) => (
          <li className='w-fit' key={index}>
            <Icons.check className='mr-1.5 inline size-5 text-primary' />
            {checkmark}
          </li>
        ))}
      </ul>
      <div className='flex justify-center'>
        <Link
          href={'/configure/upload'}
          className={buttonVariants({
            size: 'lg',
            className: 'mx-auto mt-8'
          })}
        >
          Create your case now <Icons.arrowRight className='ml-1.5 size-4' />
        </Link>
      </div>
    </>
  )
}

export default CreateYourCase
