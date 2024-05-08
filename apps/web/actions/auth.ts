'use server'

import { createClient } from '@/lib/db/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const loginWithGoogle = async () => {
  const origin = headers().get('origin')
  const db = createClient()

  const { data, error } = await db.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/callback`
    }
  })

  if (error) {
    return redirect('/sign-in?message=Could not authenticate user')
  }

  if (data.url) {
    return redirect(data.url) // use the redirect API for your server framework
  }
}

export const signOut = async () => {
  const db = createClient()
  const { error } = await db.auth.signOut()
  if (error) {
    throw new Error('Something went wrong!')
  }
  return {
    success: 'Successfully signed out!'
  }
}
