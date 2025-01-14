import MechanicsImage1 from '$/mechanics/1.jpg'

import {BLOCK_BOX} from '@/lib/constants'
import {cn} from '@/lib/utils'

import Image from 'next/image'
import {H1, H2, P} from '~/UI/Typography'
import Button from '~/UI/Button'

export default function Mechanics() {
  return (
    <section data-section="mechanics-index" className="flex flex-col items-center gap-28 xl:gap-16 sm:gap-8 border-2 border-black rounded-[32px] sm:rounded-3xl pt-16 pb-20 xl:pt-12 xl:pb-14 sm:py-8">
      <H1 className="sm:text-center">Как это работает?</H1>

      <div className={cn(BLOCK_BOX, 'space-y-10 sm:px-3')}>
        <div className={cn('grid grid-cols-12 gap-20 xl:gap-5 sm:gap-10 place-items-center', 'sm:flex sm:flex-col-reverse')}>
          <div className={cn('col-span-5', 'flex flex-col sm:flex-col gap-6 xl:-mt-5')}>
            <div className="flex flex-col gap-6 sm:gap-5 sm:flex-row">
              <div className="-mb-3 text-[156px] xl:text-8xl sm:text-6xl font-bold leading-none">1</div>

              <div className="space-y-1">
                <H2>Оставьте заявку</H2>
                <P className="max-w-[30ch] sm:leading-[1.2]">Укажите место отправки, удобное время и желаемую стоимость</P>
              </div>
            </div>

            <Button className="sm:w-full" to="#" text="оставить заявку" />
          </div>

          <Image quality={100} className={cn('col-span-7', 'block object-cover w-full h-full rounded-[32px] sm:rounded-2xl')} src={MechanicsImage1} alt="" />
        </div>
      </div>
    </section>
  )
}
