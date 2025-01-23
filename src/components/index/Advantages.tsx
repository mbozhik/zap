'use client'

import AdvantagesImage1 from '$/advantages/1.jpg'
import AdvantagesImage2 from '$/advantages/2.jpg'
import AdvantagesImage3 from '$/advantages/3.jpg'

import type {AdvantageBlock} from '@/lib/sanity'
import {BLOCK_BOX, ACTION_LINK, CARD_ROUNDED} from '@/lib/constants'

import {useState} from 'react'
import {cn} from '@/lib/utils'
import {motion, AnimatePresence} from 'motion/react'
import {useMediaQuery} from '@/lib/use-media-query'

import Image, {type StaticImageData} from 'next/image'
import {H1, H3, P} from '~/UI/Typography'
import DynamicIcon from '~/UI/DynamicIcon'
import Button from '~/UI/Button'

export default function Advantages({data}: {data: AdvantageBlock[]}) {
  const [visibleIndex, setVisibleIndex] = useState<number>(0)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  function GridImage({cellClass, src}: {cellClass: string; src: StaticImageData}) {
    return (
      <div className={cn(cellClass, 'relative size-full overflow-hidden', CARD_ROUNDED)}>
        <Image quality={100} fill={true} className="object-cover" src={src} alt="" />
      </div>
    )
  }

  return (
    <section id="advantages" data-section="advantages-index" className={cn('flex flex-col items-center gap-20 xl:gap-12 sm:gap-8 border-2 border-black pt-16 pb-20 xl:pt-12 xl:pb-14 sm:py-6', CARD_ROUNDED)}>
      <H1 animated offset={250} className="sm:text-center">
        Почему мы?
      </H1>

      <div data-section="module-advantages" className={cn(BLOCK_BOX, 'grid-cols-12', 'grid gap-20 xl:gap-14', 'sm:flex sm:flex-col-reverse sm:gap-3 sm:px-3')}>
        <div className={cn('col-span-5', 'space-y-4 xl:space-y-3')}>
          {data.map((item, idx) => (
            <div
              key={idx}
              className={cn('flex flex-col gap-2.5 items-center bg-green px-7 py-4 xl:px-5 xl:py-3.5 sm:px-4 overflow-hidden', CARD_ROUNDED)}
              onMouseEnter={() => isDesktop && setVisibleIndex(idx)} // Open on hover
              onClick={() => setVisibleIndex(idx)} // Open on click
            >
              <div className="w-full flex items-center justify-between">
                <H3 animated>{item.heading}</H3>
                <DynamicIcon className="size-12 xl:size-10" name={item.icon} />
              </div>

              <AnimatePresence>
                {visibleIndex === idx && (
                  <motion.div
                    initial={{opacity: 0, height: 0}} // Start with zero height and opacity
                    animate={{opacity: 1, height: 'auto'}} // Animate to full height and opacity
                    exit={{opacity: 0, height: 0}} // Animate out to zero height and opacity
                    transition={{duration: 0.3, ease: 'easeIn'}}
                  >
                    <P animated className="xl:!leading-[1.4]">
                      {item.caption}
                    </P>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Button to={ACTION_LINK} className="w-full py-5 xl:py-3.5 rounded-xl xl:rounded-lg" text="оставить заявку" />
        </div>

        <div className={cn('col-span-7', 'grid-cols-5 sm:grid-cols-1 min-h-[75vh] xl:min-h-[80vh] sm:min-h-0', 'grid gap-4 xl:gap-3')}>
          <div className={cn('col-span-3', 'grid-rows-12 sm:grid-rows-1', 'grid gap-4 xl:gap-3')}>
            <GridImage cellClass="row-span-7 sm:h-[30vh]" src={AdvantagesImage1} />
            <GridImage cellClass="row-span-5 sm:hidden" src={AdvantagesImage2} />
          </div>

          <GridImage cellClass="col-span-2 sm:hidden" src={AdvantagesImage3} />
        </div>
      </div>
    </section>
  )
}
