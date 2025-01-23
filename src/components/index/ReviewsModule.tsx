import {urlForImage, type ReviewBlock} from '@/lib/sanity'
import {CARD_ROUNDED} from '@/lib/constants'

import {cn} from '@/lib/utils'
import Image from 'next/image'
import {H4, SPAN, P} from '~/UI/Typography'

export default function ReviewsModule({items}: {items: ReviewBlock[]}) {
  return (
    <div data-section="module-reviews">
      <div className="flex justify-between gap-4 xl:gap-3">
        {items.map((review, idx) => (
          <div key={idx} className={cn('p-6 xl:p-5 sm:p-4 pb-14 xl:pb-8 sm:pb-5 space-y-4 border-2 border-black', CARD_ROUNDED, idx === 3 && 'xl:hidden', [1, 2, 3].includes(idx) && 'sm:hidden')}>
            <div className="flex items-center gap-3">
              <Image className="block size-12 object-cover rounded-full" src={urlForImage(review.avatar)} alt={review.name} width={250} height={250} />

              <div className="space-y-1.5">
                <H4 animated className="!leading-none">
                  {review.name}
                </H4>
                <SPAN animated className="text-black/60">
                  {review.role}
                </SPAN>
              </div>
            </div>

            <P animated className="!leading-[1.3]">
              {review.text}
            </P>
          </div>
        ))}
      </div>
    </div>
  )
}
