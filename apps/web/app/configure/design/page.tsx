import { createClient } from '@/lib/db/server'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import DesignConfigurator from './design-configurator'

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page: FC<Props> = async ({ searchParams }) => {
  const { image, width, height } = searchParams
  if (!image || typeof image !== 'string') {
    return notFound()
  }

  const db = createClient()

  const {
    data: { publicUrl }
  } = await db.storage.from('case-photos').getPublicUrl(image)

  return (
    <DesignConfigurator
      imageUrl={publicUrl}
      imageDimensions={{
        height: Number(height) || 500,
        width: Number(width) || 500
      }}
    />
  )
}

export default Page
