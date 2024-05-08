import { FC } from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'

type Props = {}

const Footer: FC<Props> = ({}) => {
  return (
    <footer className='relative h-20'>
      <MaxWidthWrapper>
        <div className='border-t border-secondary' />
        <div className='flex h-full flex-col items-center justify-center md:flex-row md:justify-between'>
          <div className='pb-2 text-center md:pb-0 md:text-left'>
            <p className='text-sm text-muted-foreground'>
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>
          <div className='flex items-center justify-center'>
            <div className='flex space-x-8'>
              <Link
                href={'#'}
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Terms
              </Link>
              <Link
                href={'#'}
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Privacy Policy
              </Link>
              <Link
                href={'#'}
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
