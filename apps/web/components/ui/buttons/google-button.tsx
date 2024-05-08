import { FC } from 'react'
import { Button } from './button'
import { loginWithGoogle } from '@/actions/auth'
import Icons from '../icons'

type Props = {}

const GoogleButton: FC<Props> = ({}) => {
  return (
    <form className='w-full'>
      <Button
        className='w-full'
        variant={'outline'}
        formAction={loginWithGoogle}
      >
        <Icons.google className='mr-2 size-4' />
        Login with Google
      </Button>
    </form>
  )
}

export default GoogleButton
