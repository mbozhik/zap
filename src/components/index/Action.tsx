import ActionImage from '$/action.png'
import MobileActionImage from '$/action-mobile.png'

import type {BlockView} from '@/lib/types'
import {ACTION_LINK} from '@/lib/constants'
import {cn} from '@/lib/utils'

import Image from 'next/image'
import {H1} from '~/UI/Typography'
import Button from '~/UI/Button'

export default function Action() {
  function ActionImageElem({visible}: {visible: BlockView}) {
    const imageStyles = {
      desktop: 'sm:hidden',
      mobile: 'hidden sm:block sm:!mt-3',
    }

    return (
      <Image
        data-section={`${visible}-image-action`}
        quality={100}
        className={cn('block w-full h-full object-contain', imageStyles[visible], visible == 'desktop' && 'col-span-6')}
        src={visible == 'desktop' ? ActionImage : MobileActionImage} // dynamic image
        alt="Интерфейс ZAP!"
      />
    )
  }

  return (
    <section data-section="action-index" className={cn('grid-cols-10', 'grid items-center xl:gap-20', 'sm:flex sm:flex-col')}>
      <div className={cn('col-span-4', 'space-y-6 xl:space-y-5 sm:space-y-6')}>
        <H1 className="!leading-[1.05]">Отправляйте документы с&nbsp;ZAP!</H1>

        <ActionImageElem visible="mobile" />

        <Button to={ACTION_LINK} className="sm:w-full" text="оставить заявку" />
      </div>

      <ActionImageElem visible="desktop" />
    </section>
  )
}
