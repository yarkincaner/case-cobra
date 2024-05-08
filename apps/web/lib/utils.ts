import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function splitArray<T>(array: Array<T>, numOfParts: number) {
  const result: Array<Array<T>> = []
  for (let i = 0; i < array.length; i++) {
    const index = i % numOfParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}
