import Stripe from 'stripe'

if (typeof process.env.STRIPE_SECRET_KEY === 'undefined') {
  throw new Error('Environment variable STRIPE_SECRET_KEY is missing!')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  typescript: true
})
