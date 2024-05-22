import { FC } from 'react'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import NavbarMenu from './NavbarMenu'

type Props = {}

const Navbar: FC<Props> = ({}) => {
  return (
    <nav className='sticky top-8 z-50'>
      <MaxWidthWrapper>
        <div className='inset-x-0 mx-auto flex h-14 w-full items-center justify-between rounded-xl bg-background/75 px-4 shadow shadow-foreground/20 backdrop-blur-lg transition-all'>
          <Link href={'/'} className='z-40 flex font-semibold'>
            case<span className='text-primary'>cobra</span>
          </Link>
          <NavbarMenu />
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
