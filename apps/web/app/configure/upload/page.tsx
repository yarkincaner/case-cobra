'use client'

import Icons from '@/components/ui/icons'
import { Progress } from '@/components/ui/progress'
import { createClient } from '@/lib/db/client'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { FC, useState, useTransition } from 'react'
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone'
import { toast } from 'sonner'

type Props = {}

const Page: FC<Props> = ({}) => {
  const db = createClient()
  const router = useRouter()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const uploadImage = async (image: File) => {
    const { data: userData, error: userError } = await db.auth.getUser()

    if (userError) {
      setUploadProgress(0)
      setIsUploading(false)
      return router.push('/sign-in', {
        scroll: false
      })
    }
    setUploadProgress(10)

    if (!userData.user) {
      setUploadProgress(0)
      setIsUploading(false)
      return router.push('/sign-in', {
        scroll: false
      })
    }
    setUploadProgress(20)

    const { data, error } = await db.storage
      .from('case-photos')
      .upload(`${userData.user.id}/${image.name}`, image, {
        upsert: true
      })

    setUploadProgress(40)

    if (error) {
      setUploadProgress(0)
      setIsUploading(false)
      return toast.error('Something went wrong!', {
        description: error.message
      })
    }
    setUploadProgress(60)

    const {
      data: { publicUrl }
    } = await db.storage.from('case-photos').getPublicUrl(data.path)
    setUploadProgress(80)

    let configId

    const { data: checkIfExist, error: checkIfExistError } = await db
      .from('configuration')
      .select('id, imageUrl')
      .eq('imageUrl', publicUrl)

    if (checkIfExistError) {
      return toast.error('Something went wrong!', {
        description: checkIfExistError.message
      })
    }

    if (checkIfExist.length < 1) {
      const { data: insertData, error: dbError } = await db
        .from('configuration')
        .insert({
          height: 500,
          width: 500,
          imageUrl: publicUrl
        })
        .select()
      if (dbError) {
        setUploadProgress(0)
        setIsUploading(false)
        return toast.error('Something went wrong!', {
          description: dbError.message
        })
      }
      configId = insertData[0].id
    } else {
      configId = checkIfExist[0].id
    }

    setUploadProgress(90)

    const url = new URL(`${origin}/configure/design`)
    const searchParams = new URLSearchParams()
    searchParams.set('configId', configId.toString())
    searchParams.set('fileName', image.name)
    searchParams.set('width', '500')
    searchParams.set('height', '500')

    url.search = searchParams.toString()
    setUploadProgress(100)

    startTransition(() => {
      router.push(url.toString())
    })
  }

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles
    setIsDragOver(false)
    toast.error(`${file.file.type} type is not supported.`, {
      description: 'Please choose a PNG, JPG, OR JPEG image instead.'
    })
  }

  const onDropAccepted = async (acceptedFiles: File[], event: DropEvent) => {
    setIsDragOver(false)
    setIsUploading(true)
    setUploadProgress(25)
    const image = acceptedFiles[0]
    await uploadImage(image)
  }

  const [isPending, startTransition] = useTransition()

  return (
    <div
      className={cn(
        'relative my-12 flex h-full w-full flex-1 flex-col items-center justify-center rounded-xl bg-muted/50 p-2 ring-1 ring-inset ring-muted-foreground/10 lg:rounded-2xl',
        {
          'bg-blue-900/10 ring-blue-900/25 dark:bg-blue-900/90 dark:ring-blue-900/75':
            isDragOver
        }
      )}
    >
      <div className='relative flex w-full flex-1 flex-col items-center justify-center'>
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={(files, e) => onDropAccepted(files, e)}
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg']
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className='flex h-full w-full flex-1 flex-col items-center justify-center'
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <Icons.mousePointerSquareDashed className='mb-2 size-6 text-muted-foreground' />
              ) : isUploading || isPending ? (
                <Icons.loader className='mb-2 size-6 animate-spin text-muted-foreground' />
              ) : (
                <Icons.image className='mb-2 size-6 text-muted-foreground' />
              )}
              <div className='mb-2 flex flex-col justify-center text-sm text-muted-foreground'>
                {isUploading ? (
                  <div className='flex flex-col items-center'>
                    <p>Uploading...</p>
                    <Progress
                      className='mt-2 h-2 w-40 bg-background'
                      value={uploadProgress}
                    />
                  </div>
                ) : isPending ? (
                  <div className='flex flex-col items-center'>
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className='font-semibold'>Drop file</span>
                    to upload
                  </p>
                ) : (
                  <p>
                    <span className='font-semibold'>Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>

              {isPending ? null : (
                <p className='text-xs text-muted-foreground'>PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default Page
