import { FC } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/buttons/button'
import Icons from '@/components/ui/icons'
import MaxWidthWrapper from './MaxWidthWrapper'
import { createClient } from '@/lib/db/server'
import Logout from './auth/Logout'

type Props = {}

const Navbar: FC<Props> = async ({}) => {
  const db = createClient()

  const {
    data: { user },
    error
  } = await db.auth.getUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <nav className='sticky top-8 z-50'>
      <MaxWidthWrapper>
        <div className='inset-x-0 mx-auto flex h-14 w-full items-center justify-between rounded-xl border border-secondary bg-background/75 px-4 shadow backdrop-blur-lg transition-all'>
          <Link href={'/'} className='z-40 flex font-semibold'>
            case<span className='text-primary'>cobra</span>
          </Link>
          <div className='flex h-full items-center space-x-4'>
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
                    Dashboard <Icons.dashboard className='ml-1.5 size-4' />
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
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
