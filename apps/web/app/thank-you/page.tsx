import { FC, Suspense } from 'react'
import ThankYou from './thank-you'

type Props = {}

const Page: FC<Props> = ({}) => {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  )
}

export default Page
