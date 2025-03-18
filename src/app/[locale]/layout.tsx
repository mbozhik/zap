import {metadata, montserrat} from '@/lib/layout-config'
import './globals.css'

import {Locale, routing} from '@/i18n/routing'
import {notFound} from 'next/navigation'

import YandexMetrika from '~/Global/Analytics'
import Header from '~/Global/Header'
import Footer from '~/Global/Footer'

export async function generateMetadata({params}: {params: {locale: Locale}}) {
  const {locale} = await Promise.resolve(params)

  return metadata[locale]
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    locale: Locale
  }
}) {
  const {locale} = await Promise.resolve(params)

  if (!routing.locales.includes(locale)) {
    notFound()
  }

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
