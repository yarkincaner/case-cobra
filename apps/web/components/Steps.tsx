'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const STEPS = [
  {
    name: 'Step 1: Add image',
    description: 'Choose an image for your case',
    url: '/upload'
  },
  {
    name: 'Step 2: Customize design',
    description: 'Make the case yours',
    url: '/design'
  },
  {
    name: 'Step 3: Summary',
    description: 'Review your design',
    url: '/preview'
  }
]

type Props = {}

const Steps: FC<Props> = ({}) => {
  const pathname = usePathname()
  return (
    <ol className='rounded-md bg-background shadow lg:flex lg:rounded-none lg:border-x lg:border-secondary'>
      {STEPS.map((step, index) => {
        const isCurrent = pathname.endsWith(step.url)
        const isCompleted = STEPS.slice(index + 1).some(step =>
          pathname.endsWith(step.url)
        )
        const imgPath = `/snake-${index + 1}.png`
        return (
          <li key={step.name} className='relative overflow-hidden lg:flex-1'>
            <div>
              <span
                className={cn(
                  'absolute left-0 top-0 h-full w-1 bg-muted lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                  {
                    'bg-muted-foreground': isCurrent,
                    'bg-primary': isCompleted
                  }
                )}
                aria-hidden='true'
              />
              <span
                className={cn(
                  index !== 0 ? 'lg:pl-9' : '',
                  'flex items-center px-6 py-4 text-sm font-medium'
                )}
              >
                <span className='flex-shrink-0'>
                  <img
                    src={imgPath}
                    className={cn(
                      'flex size-20 items-center justify-center object-contain',
                      {
                        'border-none': isCompleted,
                        'border-secondary': isCurrent
                      }
                    )}
                  />
                </span>
                <span className='ml-4 mt-0.5 flex h-full min-w-0 flex-col justify-center'>
                  <span
                    className={cn(
                      'text-sm font-semibold text-muted-foreground',
                      {
                        'text-primary': isCompleted,
                        'text-foreground': isCurrent
                      }
                    )}
                  >
                    {step.name}
                  </span>
                  <span className='text-sm text-muted-foreground'>
                    {step.description}
                  </span>
                </span>
              </span>
              {/* seperator */}
              {index !== 0 ? (
                <div className='absolute inset-0 hidden w-3 lg:block'>
                  <svg
                    className='h-full w-full text-gray-300'
                    viewBox='0 0 12 82'
                    fill='none'
                    preserveAspectRatio='none'
                  >
                    <path
                      d='M0.5 0V31L10.5 41L0.5 51V82'
                      stroke='currentcolor'
                      vectorEffect='non-scaling-stroke'
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default Steps
