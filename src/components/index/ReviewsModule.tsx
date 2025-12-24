'use client'

import GoogleLogo from '$/socials/google.svg'
import {ArrowRight, Star} from 'lucide-react'

import type {Locale} from '@/i18n/routing'
import {CARD_ROUNDED} from '@/lib/constants'

import {cn} from '@/lib/utils'
import {useMediaQuery} from '@/lib/use-media-query'

import {useState, useEffect, useCallback, useMemo} from 'react'
import {motion, AnimatePresence} from 'motion/react'

import Image from 'next/image'
import {P} from '~/UI/Typography'
import Link from 'next/link'

const REVIEWS_PER_PAGE_DESKTOP = 3
const REVIEWS_PER_PAGE_MOBILE = 1
const MAX_COMMENT_LENGTH = 220
const RUSSIAN_REGEX = /[а-яё]/i
const TRANSLATED_PREFIX = '(Translated by Google)'
const ORIGINAL_PREFIX = '(Original)'

const GOOGLE_MAPS_REVIEWS_LINK = 'https://www.google.com/search?hl=ru-RU&gl=ru&q=zap!+-+DIFC+Innovation+One,+Level+1+-+Dubai+International+Financial+Center+-+Dubai+-+ОАЭ&ludocid=5222753368005930855&lsig=AB86z5W9FmhpdL5yaz7JUvEenIHW#lrd=0x3e5f43005958a0e9:0x487af2845177ef67,1,,,,'

type Review = {
  reviewId?: string
  id?: string
  comment: string
  reviewer?: {displayName?: string; name?: string; profilePhotoUrl?: string; avatar?: string}
  avatar?: string
  name?: string
  starRating?: number
  createTime?: string
}

export default function ReviewsModule({locale}: {locale: Locale}) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isDesktop = useMediaQuery('(min-width: 768px)')

  const getTimeText = useCallback((key: string, count?: number, locale: Locale = 'en') => {
    const translations = {
      en: {
        justNow: 'Just now',
        minutesAgo: `${count} minutes ago`,
        hoursAgo: `${count} hours ago`,
        daysAgo: `${count} days ago`,
        monthsAgo: `${count} months ago`,
        yearsAgo: `${count} years ago`,
      },
      ru: {
        justNow: 'Только что',
        minutesAgo: `${count} мин назад`,
        hoursAgo: `${count} ч назад`,
        daysAgo: `${count} дн назад`,
        monthsAgo: `${count} мес назад`,
        yearsAgo: `${count} лет назад`,
      },
    }

    return translations[locale][key as keyof (typeof translations)[typeof locale]] || ''
  }, [])

  const formatTimeAgo = useCallback(
    (createTime: string) => {
      if (!createTime) return ''

      const now = new Date()
      const reviewDate = new Date(createTime)
      const diffInMs = now.getTime() - reviewDate.getTime()

      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
      const diffInMonths = Math.floor(diffInDays / 30)
      const diffInYears = Math.floor(diffInDays / 365)

      if (diffInMinutes < 1) return getTimeText('justNow', undefined, locale)
      if (diffInMinutes < 60) return getTimeText('minutesAgo', diffInMinutes, locale)
      if (diffInHours < 24) return getTimeText('hoursAgo', diffInHours, locale)
      if (diffInDays < 30) return getTimeText('daysAgo', diffInDays, locale)
      if (diffInMonths < 12) return getTimeText('monthsAgo', diffInMonths, locale)
      return getTimeText('yearsAgo', diffInYears, locale)
    },
    [getTimeText, locale],
  )

  const sortReviewsByDate = useCallback((reviewsArray: Review[]) => {
    return [...reviewsArray].sort((a, b) => {
      const dateA = new Date(a.createTime || 0).getTime()
      const dateB = new Date(b.createTime || 0).getTime()

      // Новые отзывы первыми (по убыванию даты)
      return dateB - dateA
    })
  }, [])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/reviews')
        if (!res.ok) throw new Error('Failed to fetch reviews')

        const data = await res.json()
        const reviewsArr = data.reviews || (data.widget && data.widget.reviews) || []

        const sortedReviews = sortReviewsByDate(reviewsArr)
        setReviews(sortedReviews)
      } catch (error) {
        console.error('Failed to load reviews:', error)
        setError('Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [sortReviewsByDate])

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
    const reviewsPerPage = isDesktop ? REVIEWS_PER_PAGE_DESKTOP : REVIEWS_PER_PAGE_MOBILE

    const availableReviews = isDesktop ? reviews.slice(0, Math.floor(reviews.length / REVIEWS_PER_PAGE_DESKTOP) * REVIEWS_PER_PAGE_DESKTOP) : reviews

    const numPages = Math.ceil(availableReviews.length / reviewsPerPage)
    const startIndex = currentPage * reviewsPerPage
    const endIndex = startIndex + reviewsPerPage
    const reviewsToShow = availableReviews.slice(startIndex, endIndex)

    return {
      numPages,
      reviewsToShow,
      canLoadPrev: numPages > 1,
      canLoadNext: numPages > 1,
    }
  }, [reviews, currentPage, isDesktop])

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
      <div className={cn('flex gap-4 xl:gap-3', isDesktop ? 'sm:flex-col sm:w-full' : 'flex-col')}>
        {paginationData.canLoadPrev && <NavigationButton direction="prev" onClick={loadPrevReviews} />}

        <div className={cn('grid gap-4 xl:gap-3 flex-1', isDesktop ? 'grid-cols-3' : 'grid-cols-1')}>
          <AnimatePresence mode="wait">
            {paginationData.reviewsToShow.map((review: Review, idx: number) => {
              const displayedComment = extractLocalizedText(review.comment, locale)
              const truncatedComment = displayedComment.length > MAX_COMMENT_LENGTH ? displayedComment.slice(0, MAX_COMMENT_LENGTH).trim() + '...' : displayedComment

              return (
                <motion.div className={cn('p-6 xl:p-5 sm:p-4', 'flex flex-col justify-between gap-4', 'border border-black/10 shadow-black/10 shadow-lg', CARD_ROUNDED)} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}} transition={{duration: 0.4, delay: idx * 0.1, ease: 'easeOut'}} key={`${review.reviewId || review.id || idx}-${currentPage}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Image className="block size-12 object-cover rounded-full" src={review.reviewer?.profilePhotoUrl || review.reviewer?.avatar || review.avatar || ''} alt={`Review on Zap: ${review.reviewer?.displayName || review.reviewer?.name || review.name || ''}`} width={250} height={250} />

                      <div>
                        <P animated className="text-black/80 font-semibold !leading-normal">
                          {review.reviewer?.displayName || review.reviewer?.name || review.name || ''}
                        </P>

                        <p className="text-black/60 text-sm">{formatTimeAgo(review.createTime || '')}</p>
                      </div>
                    </div>

                    <P animated className="!leading-[1.3] pb-1">
                      {truncatedComment}
                    </P>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => {
                        const rating = review.starRating || 5
                        const isFilled = i < rating
                        return <Star className={cn('size-6 sm:size-5', isFilled ? 'fill-[#f8af0a] text-[#f8af0a]' : 'fill-gray text-gray')} key={i} />
                      })}
                    </div>

                    <Link href={GOOGLE_MAPS_REVIEWS_LINK} target="_blank" rel="noopener noreferrer">
                      <Image className="size-8 sm:size-7 aspect-square" src={GoogleLogo} alt="Zap! google reviews" />
                    </Link>
                  </div>
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
