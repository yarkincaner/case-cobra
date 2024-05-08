'use client'

import Icons from '@/components/ui/icons'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { FC, useState, useTransition } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'

type Props = {}

const Page: FC<Props> = ({}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const onDropRejected = () => {}

  const onDropAccepted = () => {}

  const isUploading = false
  const [isPending, startTransition] = useTransition()

  return (
    <div
      className={cn(
        'relative my-16 flex h-full w-full flex-1 flex-col items-center justify-center rounded-xl bg-secondary p-2 ring-1 ring-inset ring-secondary lg:rounded-2xl',
        {
          'bg-blue-900/10 ring-blue-900/25 dark:bg-blue-900/90 dark:ring-blue-900/75':
            isDragOver
        }
      )}
    >
      <div className='relative flex w-full flex-1 flex-col items-center justify-center'>
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
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
