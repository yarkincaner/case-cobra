import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { createClient } from '@/lib/db/server'
import { formatPrice } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import StatusDropdown from './status-dropdown'

type Props = {}

const Page: FC<Props> = async ({}) => {
  if (typeof process.env.ADMIN_EMAIL === 'undefined') {
    throw new Error('Environment variable ADMIN_EMAIL is missing!')
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL

  const db = createClient()

  const {
    data: { user },
    error: authError
  } = await db.auth.getUser()

  if (authError || !user || user.email !== ADMIN_EMAIL) {
    return notFound()
  }

  const lastWeekDate = new Date(new Date().getDate() - 7).toISOString()
  const lastMonthDate = new Date(new Date().getDate() - 30).toISOString()

  const { data: orders, error } = await db
    .from('Order')
    .select('*, users(*), ShippingAddress(*)')
    .eq('isPaid', true)
    .gte('created_at', lastWeekDate)
    .order('created_at', {
      ascending: false
    })

  if (error) {
    throw new Error(error.message)
  }

  const { data: lastWeekSum, error: lastWeekSumError } = await db.rpc(
    'sum_of_amounts_by_date',
    { from_date: lastWeekDate }
  )

  if (lastWeekSumError) {
    throw new Error(lastWeekSumError.message)
  }

  const { data: lastMonthSum, error: lastMonthSumError } = await db.rpc(
    'sum_of_amounts_by_date',
    { from_date: lastMonthDate }
  )

  if (lastMonthSumError) {
    throw new Error(lastMonthSumError.message)
  }

  const WEEKLY_GOAL = 500
  const MONTHLY_GOAL = 2500

  return (
    <MaxWidthWrapper className='flex min-h-screen w-full pt-12 md:pt-16 lg:pt-24'>
      <div className='mx-auto flex w-full max-w-7xl flex-col sm:gap-4 sm:py-4'>
        <div className='flex flex-col gap-16'>
          <div className='grid gap-4 sm:grid-cols-2'>
            <Card>
              <CardHeader className='pb-2'>
                <CardDescription>Last Week</CardDescription>
                <CardTitle className='text-4xl'>
                  {formatPrice(lastWeekSum)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-muted-foreground'>
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={(lastWeekSum * 100) / WEEKLY_GOAL} />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className='pb-2'>
                <CardDescription>Last Month</CardDescription>
                <CardTitle className='text-4xl'>
                  {formatPrice(lastMonthSum)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-muted-foreground'>
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={(lastMonthSum * 100) / MONTHLY_GOAL} />
              </CardFooter>
            </Card>
          </div>
          <h1 className='text-4xl font-bold tracking-tight'>Incoming orders</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className='hidden sm:table-cell'>Status</TableHead>
                <TableHead className='hidden sm:table-cell'>
                  Purchase date
                </TableHead>
                <TableHead className='text-right'>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id} className='bg-accent'>
                  <TableCell>
                    <div className='font-medium'>
                      {order.ShippingAddress?.name}
                    </div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>
                      {order.users?.email}
                    </div>
                  </TableCell>
                  <TableCell className='hidden sm:table-cell'>
                    <StatusDropdown id={order.id} orderStatus={order.status} />
                  </TableCell>
                  <TableCell className='hidden sm:table-cell'>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className='text-right'>
                    {formatPrice(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Page
