'use client'

import 'react-google-reviews/dist/index.css'

import type {Locale} from '@/i18n/routing'
import {CARD_ROUNDED} from '@/lib/constants'

import {cn} from '@/lib/utils'
import {ReactGoogleReviews} from 'react-google-reviews'

import Image from 'next/image'
import {H4, P} from '~/UI/Typography'

const featurableWidgetId = process.env.NEXT_PUBLIC_FEATURABLE_WIDGET_ID || ''

export default function ReviewsModule({locale}: {locale: Locale}) {
  return (
    <div data-section="module-reviews">
      <ReactGoogleReviews
        layout="custom"
        featurableId={featurableWidgetId}
        renderer={(reviews) => {
          return (
            <div className="grid grid-cols-4 xl:grid-cols-3 sm:grid-cols-1 gap-4 xl:gap-3">
              {reviews
                .filter((review) => review.starRating === 5)
                .slice(0, 4)
                .map(({reviewId, reviewer, comment}, idx) => {
                  const extractLocalizedText = (comment: string, currentLocale: Locale) => {
                    const translatedPrefix = '(Translated by Google)'
                    const originalPrefix = '(Original)'

                    const translatedStartIndex = comment.indexOf(translatedPrefix)
                    const originalStartIndex = comment.indexOf(originalPrefix)

                    let translatedText = ''
                    let originalText = ''

                    if (translatedStartIndex !== -1) {
                      const endOfTranslatedPrefix = translatedStartIndex + translatedPrefix.length
                      const translatedContentEnd = originalStartIndex !== -1 && originalStartIndex > translatedStartIndex ? originalStartIndex : comment.length
                      translatedText = comment.substring(endOfTranslatedPrefix, translatedContentEnd).trim().replace(/^\n+/, '').replace(/\n+$/, '')
                    }

                    if (originalStartIndex !== -1) {
                      const endOfOriginalPrefix = originalStartIndex + originalPrefix.length
                      originalText = comment.substring(endOfOriginalPrefix).trim().replace(/^\n+/, '').replace(/\n+$/, '')
                    }

                    if (currentLocale === 'en') {
                      return translatedText || originalText || comment
                    } else {
                      // For other locales (e.g., 'ru')
                      return originalText || translatedText || comment
                    }
                  }

                  const displayedComment = extractLocalizedText(comment, locale)

                  return (
                    <div key={reviewId} className={cn('p-6 xl:p-5 sm:p-4 space-y-4 border-2 border-black', CARD_ROUNDED, idx === 3 && 'xl:hidden', [1, 2, 3].includes(idx) && 'sm:hidden')}>
                      <div className="flex items-center gap-3">
                        <Image className="block size-12 object-cover rounded-full" src={reviewer.profilePhotoUrl} alt={`Review on Zap: ${reviewer.displayName}`} width={250} height={250} />

                        <div className="space-y-0.5">
                          <H4 animated className="!leading-normal">
                            {reviewer.displayName}
                          </H4>
                        </div>
                      </div>

                      <P animated className="!leading-[1.3] pb-1">
                        {displayedComment}
                      </P>
                    </div>
                  )
                })}
            </div>
          )
        }}
      />
    </div>
  )
}
