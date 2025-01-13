import HeroImage from '$/hero.jpg'
import {websiteBox} from '@/app/page'

import {cn} from '@/lib/utils'
import Image from 'next/image'
import {H1, H4} from '~/UI/Typography'

const screenHeight = 'h-screen !h-svh'

export default function Hero() {
  return (
    <section data-section="hero-index" className={`relative grid items-center overflow-hidden ${screenHeight}`}>
      <div className={cn(websiteBox, 'space-y-7')}>
        <div className="space-y-2.5">
          <H1 className="max-w-[20ch]">Срочная международная доставка документов</H1>
          <H4>Москва — Дубай за 48 часов. От двери до двери.</H4>
        </div>

        <button className="py-3 text-xl text-white bg-black rounded-lg px-14">оставить заявку</button>
      </div>

      <Image priority={true} quality={100} className="absolute inset-0 block object-cover -z-20 size-full" src={HeroImage} alt="Интерфейс Zap" />
    </section>
  )
}
