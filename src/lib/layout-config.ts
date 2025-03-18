import type {Metadata} from 'next'
import {Montserrat} from 'next/font/google'

export const metadata: {[locale: string]: Metadata} = {
  ru: {
    title: 'ZAP — Срочная международная доставка документов',
    description: 'Zap! соединяет отправителей, которым нужно срочно доставить документ в другую страну, и путешественников, которые летят тем же маршрутом.',
  },
  en: {
    title: 'ZAP — Urgent International Document Delivery',
    description: 'Zap! connects senders who need to urgently deliver a document to another country with travelers flying the same route.',
  },
}

export const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
})
