import HeroImage from '$/hero.jpg'

import type {HeroBlock} from '@/lib/sanity'
import {WEBSITE_BOX, ACTION_LINK} from '@/lib/constants'

import {cn} from '@/lib/utils'
import Image from 'next/image'
import {H1, H4} from '~/UI/Typography'
import Button from '~/UI/Button'

const screenHeight = 'h-screen !h-svh'

export default function Hero({data}: {data: HeroBlock}) {
  const {heading, caption} = data

  return (
    <section data-section="hero-index" className={cn('relative grid sm:flex sm:flex-col sm:gap-10 items-center sm:pt-24 sm:pb-2 overflow-hidden sm:overflow-visible', screenHeight)}>
      <div className={cn(WEBSITE_BOX, 'space-y-7 xl:space-y-6 sm:space-y-4')}>
        <div className="space-y-2.5 xl:space-y-2 sm:space-y-1.5">
          <H1 className="max-w-[20ch]">{heading}</H1>
          <H4 className="sm:max-w-[22ch]">{caption}</H4>
        </div>

        <Button to={ACTION_LINK} target="_blank" text="оставить заявку" />
      </div>

      <Image priority={true} quality={100} className="absolute inset-0 block object-cover sm:px-2 sm:static -z-20 size-full sm:rounded-3xl sm:object-right" src={HeroImage} alt="Интерфейс Zap" />
    </section>
  )
}
