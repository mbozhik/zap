import type {ReviewBlock} from '@/lib/sanity'

import {H1} from '~/UI/Typography'
import ReviewsModule from '~/index/ReviewsModule'

export default function Reviews({data}: {data: ReviewBlock[]}) {
  return (
    <section data-section="reviews-index" className="flex flex-col items-center gap-20 xl:gap-12 sm:gap-8 pt-12 xl:pt-8">
      <H1 className="sm:text-center">Отзывы</H1>

      <ReviewsModule items={data} />
    </section>
  )
}
