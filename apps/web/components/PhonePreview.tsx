'use client'

import { Enums } from '@/types/supabase'
import { FC, useEffect, useRef, useState } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'

type Props = {
  croppedImageUrl: string
  color: Enums<'CaseColor'>
}

const PhonePreview: FC<Props> = ({ croppedImageUrl, color }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0
  })

  const handleResize = () => {
    if (!ref.current) return

    const { width, height } = ref.current.getBoundingClientRect()
    setRenderedDimensions({ width, height })
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [ref.current])

  let caseBackgroundColor = 'bg-zinc-950'
  if (color === 'blue') caseBackgroundColor = 'bg-blue-950'
  if (color === 'rose') caseBackgroundColor = 'bg-rose-950'

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className='relative'>
      <div
        className='absolute z-20 scale-[1.0352]'
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22
        }}
      >
        <img
          width={renderedDimensions.width / (3000 / 637)}
          className={cn(
            'phone-skew relative z-20 rounded-b-[10px] rounded-t-[15px] md:rounded-b-[20px] md:rounded-t-[30px]',
            caseBackgroundColor
          )}
          src={croppedImageUrl}
        />
      </div>
      <div className='relative z-40 size-full'>
        <img
          src='/clearphone.png'
          alt='phone'
          className='pointer-events-none size-full rounded-md antialiased'
        />
      </div>
    </AspectRatio>
  )
}

export default PhonePreview
