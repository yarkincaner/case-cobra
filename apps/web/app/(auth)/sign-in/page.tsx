import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Login from '@/components/auth/Login'
import Image from 'next/image'
import { FC } from 'react'

type Props = {}

const Page: FC<Props> = ({}) => {
  return (
    <section>
      <MaxWidthWrapper className='flex h-full items-center justify-center p-4 pt-14 lg:pt-32 xl:pt-36'>
        <div className='flex h-full flex-col rounded shadow dark:border md:h-2/3 md:w-full md:flex-row lg:w-2/3'>
          <Login />
          <div className='relative w-full flex-[1]'>
            <Image
              src={'/snake-3.png'}
              alt='login background'
              className='object-contain'
              fill
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default Page
