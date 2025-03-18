import {metadata, montserrat} from '@/lib/layout-config'
import './globals.css'

import {setRequestLocale} from 'next-intl/server'
import {Locale, routing} from '@/i18n/routing'
import {notFound} from 'next/navigation'
import type {Metadata} from 'next'

import YandexMetrika from '~/Global/Analytics'
import Header from '~/Global/Header'
import Footer from '~/Global/Footer'

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params
  return metadata[locale]
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{locale: Locale}>
}

export default async function RootLayout({children, params}: LayoutProps) {
  const {locale} = await params

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`bg-white text-black ${montserrat.variable} font-montserrat antialiased`}>
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />

        {process.env.NODE_ENV === 'production' && <YandexMetrika />}
      </body>
    </html>
  )
}
