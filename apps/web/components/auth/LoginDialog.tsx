'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import GoogleButton from '@/components/ui/buttons/google-button'
import { FC } from 'react'
import Image from 'next/image'

type Props = {}

const LoginDialog: FC<Props> = ({}) => {
  const router = useRouter()

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <div className='relative mx-auto mb-2 h-24 w-24'>
            <Image
              src='/snake-1.png'
              alt='snake image'
              className='object-contain'
              fill
            />
          </div>
          <DialogTitle className='text-center text-3xl font-bold tracking-tight'>
            Log in to continue
          </DialogTitle>
          <DialogDescription className='py-2 text-center text-base'>
            Login to start creating your dream phone case.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <GoogleButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
