import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronsUpDown,
  Github,
  Image,
  LayoutDashboard,
  Loader2,
  LogOut,
  LucideProps,
  Menu,
  Monitor,
  Moon,
  MousePointerSquareDashed,
  Star,
  Sun
} from 'lucide-react'

const Icons = {
  check: Check,
  star: Star,
  dashboard: LayoutDashboard,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  darkMode: Moon,
  lightMode: Sun,
  systemMode: Monitor,
  logout: LogOut,
  loader: Loader2,
  image: Image,
  mousePointerSquareDashed: MousePointerSquareDashed,
  upDown: ChevronsUpDown,
  menu: Menu,
  github: Github,
  google: (props: LucideProps) => (
    <svg {...props} viewBox='0 0 24 24'>
      <path
        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
        fill='#4285F4'
      />
      <path
        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
        fill='#34A853'
      />
      <path
        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
        fill='#FBBC05'
      />
      <path
        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
        fill='#EA4335'
      />
      <path d='M1 1h22v22H1z' fill='none' />
    </svg>
  ),
  underline: (props: LucideProps) => (
    <svg {...props} viewBox='0 0 687 155'>
      <g
        stroke='currentColor'
        strokeWidth='7'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path
          d='M20 98c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20'
          opacity='.3'
        ></path>
        <path d='M20 118c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20'></path>
      </g>
    </svg>
  )
}

export default Icons
