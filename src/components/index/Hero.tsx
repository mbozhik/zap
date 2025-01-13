import HeroImage from '$/hero.jpg'
import {websiteBox} from '@/app/page'

import {cn} from '@/lib/utils'
import Image from 'next/image'

const screenHeight = 'h-screen !h-svh'

export default function Hero() {
  return (
    <section data-section="hero-index" className={`relative grid items-center overflow-hidden ${screenHeight}`}>
      <div className={cn(websiteBox, 'space-y-7')}>
        <div className="space-y-2.5">
          <h1 className="text-[78px] tracking-tight leading-[1.07] font-bold uppercase max-w-[20ch]">Срочная международная доставка документов</h1>
          <h4 className="text-[28px] tracking-tighter font-medium">Москва — Дубай за 48 часов. От двери до двери.</h4>
        </div>

        <button className="py-3 text-xl text-white bg-black rounded-lg px-14">оставить заявку</button>
      </div>

      <Image priority={true} quality={100} className="absolute inset-0 block object-cover -z-20 size-full" src={HeroImage} alt="Интерфейс Zap" />
    </section>
  )
}
