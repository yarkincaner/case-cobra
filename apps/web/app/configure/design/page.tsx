import { createClient } from '@/lib/db/server'
import { redirect } from 'next/navigation'
import { FC } from 'react'
import sharp from 'sharp'
import { toast } from 'sonner'

type Props = {
  searchParams?: {
    path?: string
  }
}

const Page: FC<Props> = async ({ searchParams }) => {
  if (typeof searchParams?.path === 'undefined') {
    toast.error('Image path not found!', {
      description: 'Redirecting to upload page'
    })
    return redirect('/configure/upload')
  }

  const db = createClient()
  const { data, error } = await db.storage
    .from('case-photos')
    .download(searchParams.path)

  if (error) {
    return <div>Download error: {error.message}</div>
  }

  if (data === null) {
    return <div>Data is null</div>
  }

  const buffer = await data?.arrayBuffer()
  const imgMetadata = await sharp(buffer).metadata()
  const { width, height } = imgMetadata

  const { data: insertedData, error: insertError } = await db
    .from('configuration')
    .insert([
      {
        imageUrl: searchParams.path,
        height: height || 500,
        width: width || 500
      }
    ])

  if (insertError) {
    return <div>Insert Error: {insertError.message}</div>
  }
  return <div>Page</div>
}

export default Page
