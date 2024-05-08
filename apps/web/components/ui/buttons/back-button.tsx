import Link from 'next/link'
import { FC } from 'react'
import { buttonVariants } from './button'
import Icons from '../icons'

type Props = {
  href: string
  text: string
}

const BackButton: FC<Props> = ({ href, text }) => {
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: 'link',
        size: 'sm',
        className: 'self-start pl-0'
      })}
    >
      <Icons.arrowLeft className='mr-2 size-4' />
      {text}
    </Link>
  )
}

export default BackButton
