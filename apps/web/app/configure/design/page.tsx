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

// const Page: FC<Props> = async ({ searchParams }) => {
//   const { path } = searchParams
//   if (!path || typeof path !== 'string') {
//     return notFound()
//   }

//   const db = createClient()
//   const { data, error } = await db.storage.from('case-photos').download(path)

//   if (error) {
//     return <div>Download error: {error.message}</div>
//   }

//   if (data === null) {
//     return <div>Data is null</div>
//   }
//   const {
//     data: { publicUrl }
//   } = await db.storage.from('case-photos').getPublicUrl(path)

//   const buffer = await data.arrayBuffer()
//   const imgMetadata = await sharp(buffer).metadata()
//   const { width, height } = imgMetadata

//   const { data: insertedData, error: insertError } = await db
//     .from('configuration')
//     .insert([
//       {
//         imageUrl: publicUrl,
//         height: height || 500,
//         width: width || 500
//       }
//     ])
//     .select()

//   if (insertError) {
//     return <div>Insert Error: {insertError.message}</div>
//   }

//   return (
//     <DesignConfigurator
//       imageUrl={publicUrl}
//       imageDimensions={{
//         height: insertedData[0].height,
//         width: insertedData[0].width
//       }}
//     />
//   )
// }

export default Page
