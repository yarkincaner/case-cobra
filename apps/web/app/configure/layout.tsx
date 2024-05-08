import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <MaxWidthWrapper className='flex flex-1 flex-col'>
      {children}
    </MaxWidthWrapper>
  )
}

export default Layout
