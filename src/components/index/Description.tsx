import type {Locale} from '@/i18n/routing'
import {BLOCK_BOX, ACTION_LINK} from '@/lib/constants'

import {H2} from '~/UI/Typography'
import Button from '~/UI/Button'
import {m} from '@/lib/utils'

const DATA = {
  ru: 'Zap! соединяет отправителей, которым нужно срочно доставить документ в другую страну, и путешественников, которые летят тем же маршрутом.',
  en: 'Zap! seamlessly connects senders requiring urgent international document delivery with travelers heading to the same destination, ensuring efficiency and reliability.',
}

export default function Description({locale}: {locale: Locale}) {
  return (
    <section id="description" data-section="description-index" className={`grid sm:flex sm:flex-col grid-cols-10 gap-12 sm:gap-4 items-center ${BLOCK_BOX}`}>
      <H2 animated offset={250} by="word" className="col-span-7">
        {DATA[locale]}
      </H2>

      <Button to={ACTION_LINK} className={m('col-span-3', 'w-full py-6 xl:py-3.5 rounded-xl xl:rounded-lg')} type="join" locale={locale} />
    </section>
  )
}
