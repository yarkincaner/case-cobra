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
  const { configId, fileName, width, height } = searchParams
  if (!configId || typeof configId !== 'string') {
    return notFound()
  }

  if (!fileName || typeof fileName !== 'string') {
    return notFound()
  }

  const db = createClient()

  const { data, error } = await db
    .from('configuration')
    .select('imageUrl')
    .eq('id', Number(configId))

  if (error) {
    throw new Error(error.message)
  }

  return (
    <DesignConfigurator
      imageUrl={data[0].imageUrl}
      imageDimensions={{
        height: Number(height) || 500,
        width: Number(width) || 500
      }}
      imageName={fileName}
      configId={Number(configId)}
    />
  )
}

export default Page
