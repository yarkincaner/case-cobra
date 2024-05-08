import { FC } from 'react'
import BackButton from '@/components/ui/buttons/back-button'
import GoogleButton from '@/components/ui/buttons/google-button'
import Link from 'next/link'

type Props = {}

const Login: FC<Props> = ({}) => {
  return (
    <div className='flex flex-[2] flex-col gap-8 p-16 md:flex-[1]'>
      <BackButton href={'/'} text='Back Home' />
      <h1>Welcome!</h1>
      <p>Login to start creating your dream phone case.</p>
      <GoogleButton />
      <p className='text-sm text-muted-foreground'>
        Have a problem?{' '}
        <Link href={`/`} className='underline'>
          Contact us
        </Link>
      </p>
    </div>
  )
}

export default Login
