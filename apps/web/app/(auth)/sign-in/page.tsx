import LoginForm from '@/components/auth/LoginForm'
import { FC } from 'react'

type Props = {}

const Page: FC<Props> = ({}) => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <LoginForm />
    </div>
  )
}

export default Page
