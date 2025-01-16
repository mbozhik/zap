import {siteMetadata, montserrat} from '@/lib/layout-config'
import './globals.css'

export const metadata = siteMetadata

import YandexMetrika from '~/Global/Analytics'
import Header from '~/Global/Header'
import Footer from '~/Global/Footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`bg-white text-black ${montserrat.variable} font-montserrat antialiased`}>
        <Header />
        {children}
        <Footer />

        {process.env.NODE_ENV === 'production' && <YandexMetrika />}
      </body>
    </html>
  )
}
