'use server'

import { createClient } from '@/lib/db/server'
import { Enums } from '@/types/supabase'

const db = createClient()

export const changeOrderStatus = async ({
  id,
  newStatus
}: {
  id: number
  newStatus: Enums<'OrderStatus'>
}) => {
  const { error } = await db
    .from('Order')
    .update({
      status: newStatus
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}
