import type {Locale} from '@/i18n/routing'
import {BLOCK_HEADINGS} from '@/lib/constants'

import {H1} from '~/UI/Typography'
import ReviewsModule from '~/index/ReviewsModule'

export default function Reviews({locale}: {locale: Locale}) {
  return (
    <section data-section="reviews-index" className="flex flex-col items-center gap-20 xl:gap-12 sm:gap-8 pt-12 xl:pt-8 sm:pt-0">
      <H1 className="sm:text-center">{BLOCK_HEADINGS['rewiews'][locale]}</H1>

      <ReviewsModule locale={locale} />
    </section>
  )
}
