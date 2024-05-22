'use client'

import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/buttons/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Icons from '@/components/ui/icons'
import { FC, useEffect, useState } from 'react'

type Props = {}

const ThemeSwitcher: FC<Props> = ({}) => {
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Icons.lightMode className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Icons.darkMode className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value='light'>
            <Icons.lightMode className='mr-1.5 size-4' /> Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='dark'>
            <Icons.darkMode className='mr-1.5 size-4' /> Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='system'>
            <Icons.systemMode className='mr-1.5 size-4' /> System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSwitcher
