import {siteMetadata, montserrat} from '@/lib/layout-config'
import './globals.css'

export const metadata = siteMetadata

import Header from '~/Global/Header'

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
      </body>
    </html>
  )
}
