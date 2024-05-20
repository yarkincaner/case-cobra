import { createClient } from '@/lib/db/server'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import DesignPreview from './design-preview'

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page: FC<Props> = async ({ searchParams }) => {
  const { id } = searchParams
  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const db = createClient()
  const { data, error } = await db
    .from('configuration')
    .select('*')
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
  if (!data) {
    return notFound()
  }

  return <DesignPreview configuration={data[0]} />
}

export default Page
