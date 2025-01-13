import HeroImage from '$/hero.jpg'

import {WEBSITE_BOX} from '@/app/page'
import {ACTION_LINK} from '~/Global/Header'

import {cn} from '@/lib/utils'
import Image from 'next/image'
import {H1, H4} from '~/UI/Typography'
import Button from '~/UI/Button'

const screenHeight = 'h-screen !h-svh'

export default function Hero() {
  return (
    <section data-section="hero-index" className={`relative grid items-center overflow-hidden ${screenHeight}`}>
      <div className={cn(WEBSITE_BOX, 'space-y-7 xl:space-y-6')}>
        <div className="space-y-2.5 xl:space-y-2">
          <H1 className="max-w-[20ch]">Срочная международная доставка документов</H1>
          <H4>Москва — Дубай за 48 часов. От двери до двери.</H4>
        </div>

        <Button to={ACTION_LINK} target="_blank" text="оставить заявку" />
      </div>

      <Image priority={true} quality={100} className="absolute inset-0 block object-cover -z-20 size-full" src={HeroImage} alt="Интерфейс Zap" />
    </section>
  )
}
