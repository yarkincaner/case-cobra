'use client'

import Icons from '@/components/ui/icons'
import Typography from '@/components/ui/typography'
import Phone from '@/components/Phone'
import { useTheme } from 'next-themes'

const prosItems = [
  {
    text: 'High-quality, durable material'
  },
  {
    text: '5 year print guarantee'
  },
  {
    text: 'Modern iPhone models supported'
  }
]

const users = [
  {
    src: '/users/user-1.png',
    alt: 'user image 1'
  },
  {
    src: '/users/user-2.png',
    alt: 'user image 2'
  },
  {
    src: '/users/user-3.png',
    alt: 'user image 3'
  },
  {
    src: '/users/user-4.jpg',
    alt: 'user image 4'
  },
  {
    src: '/users/user-5.jpg',
    alt: 'user image 5'
  }
]

const Hero = () => {
  const { resolvedTheme } = useTheme()
  let yourImageSrc

  switch (resolvedTheme) {
    case 'light':
      yourImageSrc = '/your-image.png'
      break
    case 'dark':
      yourImageSrc = '/your-image-dark.png'
    default:
      yourImageSrc = '/your-image-dark.png'
      break
  }

  return (
    <>
      <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
        <div className='relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left'>
          <div className='absolute -top-20 left-0 hidden w-28 lg:block'>
            <img src={'/snake-1.png'} className='w-full' />
          </div>
          <Typography
            variant={'h1'}
            className='relative mt-16 w-fit text-balance !leading-tight tracking-tight'
          >
            Your Image on a{' '}
            <span className='bg-primary px-2 text-primary-foreground'>
              Custom
            </span>{' '}
            Phone Case
          </Typography>
          <Typography
            variant={'p'}
            className='mt-8 max-w-prose text-balance text-center md:text-wrap lg:pr-10 lg:text-left'
          >
            Capture your favorite memories with your own,{' '}
            <span className='font-semibold'>one-of-one</span> phone case.
            CaseCobra allows you to protect your memories, not just your phone
            case.
          </Typography>
          <ul className='mt-8 flex flex-col items-center space-y-2 text-left font-medium sm:items-start'>
            {prosItems.map((item, index) => (
              <li className='flex items-center gap-1.5 text-left' key={index}>
                <Icons.check className='size-5 shrink-0 text-primary' />
                {item.text}
              </li>
            ))}
          </ul>
          <div className='mt-12 flex flex-col items-center gap-5 sm:flex-row sm:items-start'>
            <div className='flex -space-x-4'>
              {users.map((user, index) => (
                <img
                  className='inline-block size-10 rounded-full object-cover ring-2 ring-background'
                  src={user.src}
                  alt={user.alt}
                  key={index}
                />
              ))}
            </div>
            <div className='flex flex-col items-center justify-between sm:items-start'>
              <div className='flex gap-0.5'>
                {[...Array(5)].map((_, index) => (
                  <Icons.star
                    className='size-5 fill-primary text-primary'
                    key={index}
                  />
                ))}
              </div>
              <p>
                <span className='font-semibold'>1.250</span> happy customers
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20'>
        <div className='max-w-xl md:relative'>
          <img
            src={yourImageSrc}
            className='absolute -top-20 left-56 hidden w-40 select-none sm:block lg:hidden lg:w-52 xl:block'
          />
          <img
            src='/line.png'
            className='absolute -bottom-6 -left-6 w-20 select-none'
          />
          <Phone className='w-64' imgSrc='/testimonials/1.jpg' />
        </div>
      </div>
    </>
  )
}

export default Hero
