'use client'

import { changeOrderStatus } from '@/actions/order'
import { Button } from '@/components/ui/buttons/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Icons from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { Enums } from '@/types/supabase'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

const orderStatusValues: Enums<'OrderStatus'>[] = [
  'fulfilled',
  'shipped',
  'awaiting_shipment'
]

const LABEL_MAP: Record<Enums<'OrderStatus'>, string> = {
  awaiting_shipment: 'Awaiting Shipment',
  fulfilled: 'Fulfilled',
  shipped: 'Shipped'
}

type Props = {
  id: number
  orderStatus: Enums<'OrderStatus'>
}

const StatusDropdown: FC<Props> = ({ id, orderStatus }) => {
  const router = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['change-order-status'],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh()
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className='flex w-52 items-center justify-between'
        >
          {LABEL_MAP[orderStatus]}
          <Icons.upDown className='ml-2 size-4 shrink-0 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        {orderStatusValues.map(status => (
          <DropdownMenuItem
            key={status}
            className={cn(
              'flex cursor-default items-center gap-1 p-2.5 text-sm hover:bg-muted/30 hover:text-muted-foreground',
              {
                'bg-muted/30 text-muted-foreground': orderStatus === status
              }
            )}
            onClick={() => mutate({ id, newStatus: status })}
          >
            <Icons.check
              className={cn(
                'mr-2 size-4 text-primary',
                orderStatus === status ? 'opacity-100' : 'opacity-0'
              )}
            />
            {LABEL_MAP[status]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StatusDropdown
