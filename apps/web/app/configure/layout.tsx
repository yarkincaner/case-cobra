import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Steps from '@/components/Steps'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <MaxWidthWrapper className='flex flex-1 flex-col pt-12 md:pt-16 lg:pt-24'>
      <Steps />
      {children}
    </MaxWidthWrapper>
  )
}

export default Layout
