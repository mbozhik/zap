'use client'

import type {Locale} from '@/i18n/routing'

import Button from '~/UI/Button'
import {usePathname} from 'next/navigation'
import {cn} from '@/lib/utils'

export default function LocaleSwitch() {
  const pathname = usePathname()

  const currentLocale = pathname.split('/')[1] as Locale
  const newLocale: Locale = currentLocale === 'ru' ? 'en' : 'ru'

  const toggleLocale = () => {
    const hash = window.location.hash
    const newPathname = `/${newLocale}${pathname.replace(/^\/[a-z]{2}/, '')}${hash}`

    window.location.href = newPathname // full page reload
  }

  return <Button onClick={toggleLocale} animated={false} className={cn('px-3.5 justify-self-end sm:text-base sm:px-3 sm:py-2', 'bg-white border-black text-black')} text={newLocale} />
}
