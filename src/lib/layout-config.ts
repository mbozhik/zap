import type {Metadata} from 'next'
import {Montserrat} from 'next/font/google'

export const siteMetadata: Metadata = {
  title: 'ZAP — Срочная международная доставка документов',
  description: 'Zap! соединяет отправителей, которым нужно срочно доставить документ в другую страну, и путешественников, которые летят тем же маршрутом.',
}

export const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
})
