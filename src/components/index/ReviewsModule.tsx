'use client'

import {ArrowRight} from 'lucide-react'

import type {Locale} from '@/i18n/routing'
import {CARD_ROUNDED} from '@/lib/constants'

import {cn} from '@/lib/utils'

import {useState, useEffect, useCallback, useMemo} from 'react'
import {motion, AnimatePresence} from 'motion/react'

import Image from 'next/image'
import {H4, P} from '~/UI/Typography'

const REVIEWS_PER_PAGE = 4
const MAX_COMMENT_LENGTH = 220
const RUSSIAN_REGEX = /[а-яё]/i
const TRANSLATED_PREFIX = '(Translated by Google)'
const ORIGINAL_PREFIX = '(Original)'

type Review = {
  reviewId?: string
  id?: string
  comment: string
  reviewer?: {displayName?: string; name?: string; profilePhotoUrl?: string; avatar?: string}
  avatar?: string
  name?: string
}

export default function ReviewsModule({locale}: {locale: Locale}) {
  const [currentPage, setCurrentPage] = useState(0)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getReviewLanguage = useCallback((comment: string) => {
    if (!comment) return 'unknown'

    if (!comment.includes(TRANSLATED_PREFIX) && !comment.includes(ORIGINAL_PREFIX)) {
      return RUSSIAN_REGEX.test(comment) ? 'ru' : 'en'
    }

    const originalStartIndex = comment.indexOf(ORIGINAL_PREFIX)

    let originalText = ''

    if (originalStartIndex !== -1) {
      const endOfOriginalPrefix = originalStartIndex + ORIGINAL_PREFIX.length
      originalText = comment.substring(endOfOriginalPrefix).trim()
    }

    if (originalText) {
      return RUSSIAN_REGEX.test(originalText) ? 'ru' : 'en'
    }

    return RUSSIAN_REGEX.test(comment) ? 'ru' : 'en'
  }, [])

  const sortReviewsByLanguage = useCallback(
    (reviewsArray: Review[], currentLocale: Locale) => {
      return [...reviewsArray].sort((a, b) => {
        const langA = getReviewLanguage(a.comment)
        const langB = getReviewLanguage(b.comment)

        if (currentLocale === 'ru') {
          if (langA === 'ru' && langB !== 'ru') return -1
          if (langA !== 'ru' && langB === 'ru') return 1
        } else {
          if (langA === 'en' && langB !== 'en') return -1
          if (langA !== 'en' && langB === 'en') return 1
        }

        return 0
      })
    },
    [getReviewLanguage],
  )

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/reviews')
        if (!res.ok) throw new Error('Failed to fetch reviews')

        const data = await res.json()
        const reviewsArr = data.reviews || (data.widget && data.widget.reviews) || []

        const sortedReviews = sortReviewsByLanguage(reviewsArr, locale)
        setReviews(sortedReviews)
      } catch (error) {
        console.error('Failed to load reviews:', error)
        setError('Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [locale, sortReviewsByLanguage])

  const extractLocalizedText = useCallback((comment: string, currentLocale: Locale) => {
    if (!comment.includes(TRANSLATED_PREFIX) && !comment.includes(ORIGINAL_PREFIX)) {
      return comment
    }

    const translatedStartIndex = comment.indexOf(TRANSLATED_PREFIX)
    const originalStartIndex = comment.indexOf(ORIGINAL_PREFIX)

    let translatedText = ''
    let originalText = ''

    if (translatedStartIndex !== -1) {
      const endOfTranslatedPrefix = translatedStartIndex + TRANSLATED_PREFIX.length
      const translatedContentEnd = originalStartIndex !== -1 && originalStartIndex > translatedStartIndex ? originalStartIndex : comment.length
      translatedText = comment.substring(endOfTranslatedPrefix, translatedContentEnd).trim().replace(/^\n+/, '').replace(/\n+$/, '')
    }

    if (originalStartIndex !== -1) {
      const endOfOriginalPrefix = originalStartIndex + ORIGINAL_PREFIX.length
      originalText = comment.substring(endOfOriginalPrefix).trim().replace(/^\n+/, '').replace(/\n+$/, '')
    }

    const isOriginalRussian = originalText ? RUSSIAN_REGEX.test(originalText) : false
    const isTranslatedRussian = translatedText ? RUSSIAN_REGEX.test(translatedText) : false

    if (currentLocale === 'ru') {
      if (isOriginalRussian && originalText) {
        return originalText
      }
      if (isTranslatedRussian && translatedText) {
        return translatedText
      }

      return originalText || translatedText || comment
    } else {
      if (!isOriginalRussian && originalText) {
        return originalText
      }
      if (!isTranslatedRussian && translatedText) {
        return translatedText
      }
      return translatedText || originalText || comment
    }
  }, [])

  const paginationData = useMemo(() => {
    const numPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE)
    const startIndex = currentPage * REVIEWS_PER_PAGE
    const endIndex = startIndex + REVIEWS_PER_PAGE
    const reviewsToShow = reviews.slice(startIndex, endIndex)

    return {
      numPages,
      reviewsToShow,
      canLoadPrev: numPages > 1,
      canLoadNext: numPages > 1,
    }
  }, [reviews, currentPage])

  const loadPrevReviews = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage - 1 + paginationData.numPages) % paginationData.numPages)
  }, [paginationData.numPages])

  const loadNextReviews = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage + 1) % paginationData.numPages)
  }, [paginationData.numPages])

  if (loading) {
    return (
      <div data-section="module-reviews" className="grid place-items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>

          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div data-section="module-reviews" className="grid place-items-center h-64">
        <div className="text-center">
          <p className="text-red-600">Error loading reviews: {error}</p>
        </div>
      </div>
    )
  }

  if (!reviews.length) {
    return (
      <div data-section="module-reviews" className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">No reviews available</p>
        </div>
      </div>
    )
  }

  function NavigationButton({direction, onClick}: {direction: 'prev' | 'next'; onClick: () => void}) {
    return (
      <motion.div className={cn('grid place-items-center', 'min-w-fit px-3 xl:px-2 sm:py-2 min-h-full', 'bg-black text-white border-2 border-transparent cursor-pointer', 'hover:bg-black/90 duration-300', CARD_ROUNDED)} onClick={onClick} initial={{opacity: 1}} transition={{duration: 0.3}}>
        {direction === 'prev' ? <ArrowRight className="rotate-180" /> : <ArrowRight />}
      </motion.div>
    )
  }

  return (
    <div data-section="module-reviews">
      <div className="flex sm:flex-col gap-4 xl:gap-3 sm:w-full">
        {paginationData.canLoadPrev && <NavigationButton direction="prev" onClick={loadPrevReviews} />}

        <div className="grid grid-cols-4 xl:grid-cols-3 sm:grid-cols-1 gap-4 xl:gap-3 flex-1">
          <AnimatePresence mode="wait">
            {paginationData.reviewsToShow.map((review: Review, idx: number) => {
              const displayedComment = extractLocalizedText(review.comment, locale)
              const truncatedComment = displayedComment.length > MAX_COMMENT_LENGTH ? displayedComment.slice(0, MAX_COMMENT_LENGTH).trim() + '...' : displayedComment

              return (
                <motion.div key={`${review.reviewId || review.id || idx}-${currentPage}`} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}} transition={{duration: 0.4, delay: idx * 0.1, ease: 'easeOut'}} className={cn('p-6 xl:p-5 sm:p-4 space-y-4 border-2 border-black', CARD_ROUNDED, idx === 3 && 'xl:hidden', [1, 2, 3].includes(idx) && 'sm:hidden')}>
                  <div className="flex items-center gap-3">
                    <Image className="block size-12 object-cover rounded-full" src={review.reviewer?.profilePhotoUrl || review.reviewer?.avatar || review.avatar || ''} alt={`Review on Zap: ${review.reviewer?.displayName || review.reviewer?.name || review.name || ''}`} width={250} height={250} />

                    <div className="space-y-0.5">
                      <H4 animated className="!leading-normal">
                        {review.reviewer?.displayName || review.reviewer?.name || review.name || ''}
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

        {paginationData.canLoadNext && <NavigationButton direction="next" onClick={loadNextReviews} />}
      </div>
    </div>
  )
}
