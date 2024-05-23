import { FC } from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import Icons from './ui/icons'

type Props = {}

const Footer: FC<Props> = ({}) => {
  return (
    <footer className='relative h-20'>
      <MaxWidthWrapper>
        <div className='border-t border-muted' />
        <div className='flex h-full flex-col items-center justify-center md:flex-row md:justify-between'>
          <div className='flex space-x-4 pb-2 text-center text-sm md:pb-0 md:text-left'>
            <p className='text-muted-foreground hover:text-foreground'>
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
            <Link
              href={'#'}
              className='flex items-center text-muted-foreground hover:text-foreground'
            >
              <Icons.github className='mr-1.5 size-4' /> Source code
            </Link>
          </div>
          <div className='flex items-center justify-center'>
            <div className='flex space-x-8 text-sm'>
              <Link
                href={'#'}
                className='text-muted-foreground hover:text-foreground'
              >
                Terms
              </Link>
              <Link
                href={'#'}
                className='text-muted-foreground hover:text-foreground'
              >
                Privacy Policy
              </Link>
              <Link
                href={'#'}
                className='text-muted-foreground hover:text-foreground'
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
