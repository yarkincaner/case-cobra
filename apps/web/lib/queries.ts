'use client'

import { getPaymentStatus } from '@/actions/payment'
import { useQuery } from '@tanstack/react-query'

export const useGetPaymentStatus = ({ orderId }: { orderId: number }) => {
  return useQuery({
    queryKey: ['get-payment-status'],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 5000
  })
}
