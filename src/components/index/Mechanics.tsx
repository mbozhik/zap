import type {Locale} from '@/i18n/routing'
import type {MechanicsBlock} from '@/lib/sanity'
import type {BlockView} from '@/lib/types'
import {BLOCK_BOX, BLOCK_HEADINGS, CARD_ROUNDED} from '@/lib/constants'

import {cn, Localizator} from '@/lib/utils'
import {urlForImage} from '@/lib/sanity'

import Image from 'next/image'
import {H1, H2, P} from '~/UI/Typography'
import Button from '~/UI/Button'

export default function Mechanics({data, locale}: {data: MechanicsBlock[]; locale: Locale}) {
  return (
    <section id="mechanics" data-section="mechanics-index" className={cn('flex flex-col items-center gap-20 xl:gap-12 sm:gap-8 border-2 border-black pt-16 pb-20 xl:pt-12 xl:pb-14 sm:py-6', CARD_ROUNDED)}>
      <H1 animated offset={250} className="sm:text-center">
        {BLOCK_HEADINGS['mechanics'][locale]}
      </H1>

      <div className={cn(BLOCK_BOX, 'space-y-20 sm:space-y-12 sm:px-3')}>
        {data.map((item, index) => (
          <MechanicsCard data={item} locale={locale} idx={index} key={index} />
        ))}
      </div>
    </section>
  )
}

function MechanicsCard({data, locale, idx}: {data: MechanicsBlock; locale: Locale; idx: number}) {
  const getLocalized = Localizator(locale)

  const isOdd = idx % 2 === 0

  const GRID_CONFIG = {
    base: 'grid-cols-12',
    small: 'col-span-5',
    big: 'col-span-7',
  }

  const RenderImage = ({visible}: {visible: BlockView}) => <Image quality={100} className={cn(GRID_CONFIG.big, 'block object-cover w-full h-full rounded-[32px] sm:rounded-2xl', visible === 'desktop' ? 'sm:hidden' : 'hidden sm:block')} src={urlForImage(data.image)} alt={getLocalized(data.heading)} width={1000} height={1000} />

  return (
    <div className={cn(GRID_CONFIG.base, 'grid gap-20 xl:gap-5 sm:gap-10 place-items-center', 'sm:flex sm:flex-col')}>
      {!isOdd && <RenderImage visible="desktop" />}
      <RenderImage visible="mobile" />

      <div className={cn(GRID_CONFIG.small, 'flex flex-col sm:flex-col gap-6 xl:gap-5 xl:-mt-5')}>
        <div className="flex flex-col gap-6 sm:gap-5 sm:flex-row">
          <div className="-mb-3 text-[156px] xl:text-8xl sm:text-6xl font-bold leading-none">{idx + 1}</div>

          <div className="space-y-3">
            <H2 animated className="max-w-[10ch] !leading-[1]">
              {getLocalized(data.heading)}
            </H2>
            <P animated by="word" className="max-w-[30ch] xl:leading-[1.2] sm:leading-[1.25]">
              {getLocalized(data.caption)}
            </P>
          </div>
        </div>

        {data.action && <Button className="sm:w-full" to={data.action[0].action} text={getLocalized(data.action[0].label)} />}
      </div>
      {isOdd && <RenderImage visible="desktop" />}
    </div>
  )
}
