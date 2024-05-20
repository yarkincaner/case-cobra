'use client'

import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

type Props = {
  children: ReactNode
}

const Providers: FC<Props> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default Providers
