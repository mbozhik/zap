import {siteMetadata, montserrat} from '@/lib/layout-config'
import './globals.css'

export const metadata = siteMetadata

import Header from '~/Global/Header'
import YandexMetrika from '~/Global/Analytics'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`bg-white text-black ${montserrat.variable} font-montserrat antialiased`}>
        <Header />
        {children}

        {process.env.NODE_ENV === 'production' && <YandexMetrika />}
      </body>
    </html>
  )
}
