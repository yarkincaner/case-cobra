import { FC } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import Icons from '@/components/ui/icons'

type Props = {}

const Navbar: FC<Props> = ({}) => {
  const user = undefined
  const isAdmin = false

  return (
    <nav className='sticky inset-x-0 top-8 z-[100] mx-auto h-14 w-11/12 rounded-xl border border-secondary bg-background/75 px-4 shadow backdrop-blur-lg transition-all sm:w-5/6 md:w-3/4 xl:w-2/3'>
      <div className='flex h-14 items-center justify-between'>
        <Link href={'/'} className='z-40 flex font-semibold'>
          case<span className='text-primary'>cobra</span>
        </Link>
        <div className='flex h-full items-center space-x-4'>
          {user ? (
            <>
              <Link
                href={'/api/auth/logout'}
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost'
                })}
              >
                Sign out
              </Link>
              {isAdmin ? (
                <Link
                  href={'/api/auth/logout'}
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost'
                  })}
                >
                  Dashboard <Icons.dashboard className='ml-1.5 size-4' />
                </Link>
              ) : null}
              <Link
                href={'/configure/upload'}
                className={buttonVariants({
                  size: 'sm',
                  className: 'hidden items-center gap-1 sm:flex'
                })}
              >
                Create case <Icons.arrowRight className='ml-1.5 size-4' />
              </Link>
            </>
          ) : (
            <>
              <Link
                href={'/api/auth/register'}
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost'
                })}
              >
                Sign up
              </Link>
              <Link
                href={'/api/auth/login'}
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost'
                })}
              >
                Login
              </Link>
              <div className='hidden h-8 w-px bg-secondary sm:block' />
              <Link
                href={'/configure/upload'}
                className={buttonVariants({
                  size: 'sm',
                  className: 'hidden items-center gap-1 sm:flex'
                })}
              >
                Create case <Icons.arrowRight className='ml-1.5 size-4' />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
