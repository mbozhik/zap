'use client'

import 'react-google-reviews/dist/index.css'
import {ArrowRight} from 'lucide-react'

import type {Locale} from '@/i18n/routing'
import {CARD_ROUNDED} from '@/lib/constants'

import {cn} from '@/lib/utils'

import {useState} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import {ReactGoogleReviews} from 'react-google-reviews'

import Image from 'next/image'
import {H4, P} from '~/UI/Typography'

const featurableWidgetId = process.env.NEXT_PUBLIC_FEATURABLE_WIDGET_ID || ''

export default function ReviewsModule({locale}: {locale: Locale}) {
  const [currentPage, setCurrentPage] = useState(0)
  const reviewsPerPage = 4

  return (
    <div data-section="module-reviews">
      <ReactGoogleReviews
        layout="custom"
        featurableId={featurableWidgetId}
        renderer={(reviews) => {
          const fiveStarReviews = reviews.filter((review) => review.starRating === 5)
          const numPages = Math.ceil(fiveStarReviews.length / reviewsPerPage)

          const startIndex = currentPage * reviewsPerPage
          const endIndex = startIndex + reviewsPerPage
          const reviewsToShow = fiveStarReviews.slice(startIndex, endIndex)

          const loadPrevReviews = () => {
            setCurrentPage((prevPage) => (prevPage - 1 + numPages) % numPages)
          }

          const loadNextReviews = () => {
            setCurrentPage((prevPage) => (prevPage + 1) % numPages)
          }

          const canLoadPrev = numPages > 1
          const canLoadNext = numPages > 1

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
              return originalText || translatedText || comment
            }
          }

          return (
            <div className="flex sm:flex-col gap-4 xl:gap-3 sm:w-full">
              {canLoadPrev && (
                <motion.div className={cn('grid place-items-center', 'min-w-fit px-3 xl:px-2 sm:py-2 min-h-full', 'bg-black text-white border-2 border-transparent cursor-pointer', CARD_ROUNDED)} onClick={loadPrevReviews} initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}} transition={{duration: 0.3}}>
                  <ArrowRight className="rotate-180" />
                </motion.div>
              )}

              <div className="grid grid-cols-4 xl:grid-cols-3 sm:grid-cols-1 gap-4 xl:gap-3 flex-1">
                <AnimatePresence mode="wait">
                  {reviewsToShow.map(({reviewId, reviewer, comment}, idx) => {
                    const displayedComment = extractLocalizedText(comment, locale)

                    const maxLength = 220
                    const truncatedComment = displayedComment.length > maxLength ? displayedComment.slice(0, maxLength).trim() + '...' : displayedComment

                    return (
                      <motion.div
                        key={`${reviewId}-${currentPage}`} // Use template string for clear uniqueness
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.1,
                          ease: 'easeOut',
                        }}
                        className={cn('p-6 xl:p-5 sm:p-4 space-y-4 border-2 border-black', CARD_ROUNDED, idx === 3 && 'xl:hidden', [1, 2, 3].includes(idx) && 'sm:hidden')}
                      >
                        <div className="flex items-center gap-3">
                          <Image className="block size-12 object-cover rounded-full" src={reviewer.profilePhotoUrl} alt={`Review on Zap: ${reviewer.displayName}`} width={250} height={250} />

                          <div className="space-y-0.5">
                            <H4 animated className="!leading-normal">
                              {reviewer.displayName}
                            </H4>
                          </div>
                        </div>

                        <P animated className="!leading-[1.3] pb-1">
                          {truncatedComment}
                        </P>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {canLoadNext && (
                <motion.div className={cn('grid place-items-center', 'min-w-fit px-3 xl:px-2 sm:py-2 min-h-full', 'bg-black text-white border-2 border-transparent cursor-pointer', CARD_ROUNDED)} onClick={loadNextReviews} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 20}} transition={{duration: 0.3}}>
                  <ArrowRight />
                </motion.div>
              )}
            </div>
          )
        }}
      />
    </div>
  )
}
