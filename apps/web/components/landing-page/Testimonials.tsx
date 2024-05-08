import { FC } from 'react'
import Icons from '@/components/ui/icons'

type Props = {}

const Testimonials: FC<Props> = ({}) => {
  return (
    <>
      <div className='flex flex-col items-center gap-4 sm:gap-6 lg:flex-row'>
        <h2 className='order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight md:text-6xl'>
          What our{' '}
          <span className='relative px-2'>
            customers{' '}
            <Icons.underline className='pointer-events-none absolute inset-x-0 -bottom-6 hidden text-primary sm:block' />{' '}
          </span>{' '}
          say
        </h2>
        <img src='/snake-2.png' className='order-[0] w-24 lg:order-2' />
      </div>
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
        {/* first user review */}
        <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
          <div className='mb-2 flex gap-0.5'>
            {[...Array(5)].map((_, index) => (
              <Icons.star
                className='size-5 fill-primary text-primary'
                key={index}
              />
            ))}
          </div>
          <div className='text-lg leading-8'>
            <p>
              &quot;The case feels durable and I even got a compliment on the
              design. Had the case for two and a half months now and{' '}
              <span className='bg-secondary p-0.5 text-secondary-foreground'>
                the image is super clear
              </span>
              , on the case I had before, the image started fading into
              yellow-ish color after a couple weeks. Love it.&quot;
            </p>
          </div>
          <div className='mt-2 flex gap-4'>
            <img
              className='size-12 rounded-full object-cover'
              src='/users/user-1.png'
              alt='user-1'
            />
            <div className='flex flex-col'>
              <p className='font-semibold'>Jonathan</p>
              <div className='flex items-center gap-1.5 text-muted-foreground'>
                <Icons.check className='size-4 stroke-[3px] text-primary' />
                <p className='text-sm'>Verified Purchase</p>
              </div>
            </div>
          </div>
        </div>
        {/* second user review */}
        <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
          <div className='mb-2 flex gap-0.5'>
            {[...Array(5)].map((_, index) => (
              <Icons.star
                className='size-5 fill-primary text-primary'
                key={index}
              />
            ))}
          </div>
          <div className='text-lg leading-8'>
            <p>
              &quot;I usually keep my phone together with my keys in my pocket
              and that led to some pretty heavy scratchmarks on all of my last
              phone cases. This one, besides a barely noticeable scratch on the
              corner,{' '}
              <span className='bg-secondary p-0.5 text-secondary-foreground'>
                looks brand new after about half a year
              </span>
              . I dig it.&quot;
            </p>
          </div>
          <div className='mt-2 flex gap-4'>
            <img
              className='size-12 rounded-full object-cover'
              src='/users/user-4.jpg'
              alt='user-4'
            />
            <div className='flex flex-col'>
              <p className='font-semibold'>Josh</p>
              <div className='flex items-center gap-1.5 text-muted-foreground'>
                <Icons.check className='size-4 stroke-[3px] text-primary' />
                <p className='text-sm'>Verified Purchase</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Testimonials
