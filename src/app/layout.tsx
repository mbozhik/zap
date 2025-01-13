import {siteMetadata} from '@/lib/layout-config'
import './globals.css'

export const metadata = siteMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
