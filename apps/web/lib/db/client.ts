import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  if (typeof process.env.SUPABASE_URL === 'undefined') {
    throw new Error('Environment variable SUPABASE_URL is missing!')
  }
  if (typeof process.env.SUPABASE_ANON_KEY === 'undefined') {
    throw new Error('Environment variable SUPABASE_ANON_KEY is missing!')
  }

  return createBrowserClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  )
}
