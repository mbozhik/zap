import type {RoleType} from '@/lib/types'
import type {Locale} from '@/i18n/routing'
import {urlForImage, type ReviewBlock} from '@/lib/sanity'
import {CARD_ROUNDED} from '@/lib/constants'

import {cn, Localizator} from '@/lib/utils'
import Image from 'next/image'
import {H4, SPAN, P} from '~/UI/Typography'

const ROLE_TEXT: {[locale in Locale]: {[key in RoleType]: string}} = {
  ru: {
    отправитель: 'отправитель',
    путешественник: 'путешественник',
  },
  en: {
    отправитель: 'sender',
    путешественник: 'traveler',
  },
}

export default function ReviewsModule({items, locale}: {items: ReviewBlock[]; locale: Locale}) {
  const getLocalized = Localizator(locale)

  return (
    <div data-section="module-reviews">
      <div className="flex justify-between gap-4 xl:gap-3">
        {items.map((review, idx) => (
          <div key={idx} className={cn('p-6 xl:p-5 sm:p-4 pb-14 xl:pb-8 sm:pb-5 space-y-4 border-2 border-black', CARD_ROUNDED, idx === 3 && 'xl:hidden', [1, 2, 3].includes(idx) && 'sm:hidden')}>
            <div className="flex items-center gap-3">
              <Image className="block size-12 object-cover rounded-full" src={urlForImage(review.avatar)} alt={getLocalized(review.name)} width={250} height={250} />

              <div className="space-y-0.5">
                <H4 animated className="!leading-none">
                  {getLocalized(review.name)}
                </H4>
                <SPAN animated className="text-black/60 ml-0.5">
                  {ROLE_TEXT[locale][review.role]}
                </SPAN>
              </div>
            </div>

            <P animated className="!leading-[1.3]">
              {getLocalized(review.text)}
            </P>
          </div>
        ))}
      </div>
    </div>
  )
}
