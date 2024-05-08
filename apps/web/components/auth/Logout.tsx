'use client'

import { FC } from 'react'
import { Button } from '../ui/buttons/button'
import Icons from '../ui/icons'
import { signOut } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Props = {}

const Logout: FC<Props> = () => {
  const { replace } = useRouter()
  const handleSignOut = async () => {
    toast.promise(signOut, {
      loading: 'Loading...',
      error: error => {
        return error
      },
      success: data => {
        replace('/')
        return data.success
      }
    })
  }

  return (
    <form action={handleSignOut}>
      <Button type='submit' variant={'ghost'} size={'sm'}>
        Sign out
        <Icons.logout className='ml-1.5 size-4' />
      </Button>
    </form>
  )
}

export default Logout
