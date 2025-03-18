import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {type LocalizedValue} from '@/lib/sanity/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export {twMerge as m}

export const Localizator = (locale: string) => {
  return (data: LocalizedValue[]): string => {
    return data.find((item) => item._key === locale)?.value || data[0].value
  }
}
