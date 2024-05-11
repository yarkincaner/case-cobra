import { Database } from '@/types/supabase'
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  if (typeof process.env.NEXT_PUBLIC_SUPABASE_URL === 'undefined') {
    throw new Error('Environment variable NEXT_PUBLIC_SUPABASE_URL is missing!')
  }
  if (typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'undefined') {
    throw new Error(
      'Environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY is missing!'
    )
  }

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
