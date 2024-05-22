import { createClient } from '@/lib/db/server'
import { FC } from 'react'
import ThemeSwitcher from './theme/theme-switcher'
import Logout from './auth/Logout'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/buttons/button'
import Icons from './ui/icons'

type Props = {}

const NavbarMenu: FC<Props> = async ({}) => {
  const db = createClient()

  const {
    data: { user },
    error
  } = await db.auth.getUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <div className='flex h-full items-center space-x-0 sm:space-x-4'>
      <ThemeSwitcher />
      {user ? (
        <div className='flex items-center sm:space-x-2'>
          <Logout />
          {isAdmin ? (
            <Link
              href={'/dashboard'}
              className={buttonVariants({
                size: 'sm',
                variant: 'ghost'
              })}
            >
              <span className='hidden sm:block'>Dashboard</span>{' '}
              <Icons.dashboard className='ml-1.5 size-4' />
            </Link>
          ) : null}
        </div>
      ) : (
        <Link
          href={'/sign-in'}
          className={buttonVariants({
            size: 'sm',
            variant: 'ghost'
          })}
          scroll={false}
        >
          Login
        </Link>
      )}
      <div className='hidden h-8 w-px bg-muted sm:block' />
      <Link
        href={'/configure/upload'}
        className={buttonVariants({
          size: 'sm',
          className: 'hidden items-center gap-1 sm:flex'
        })}
      >
        Create case <Icons.arrowRight className='ml-1.5 size-4' />
      </Link>
    </div>
  )
}

export default NavbarMenu
