import ActionImage from '$/action.png'

import {ACTION_LINK} from '@/lib/constants'
import {cn} from '@/lib/utils'

import Image from 'next/image'
import {H1} from '~/UI/Typography'
import Button from '~/UI/Button'

export default function Action() {
  return (
    <section data-section="action-index" className={cn('grid-cols-10', 'grid items-center xl:gap-20')}>
      <div className={cn('col-span-4', 'space-y-6 xl:space-y-5')}>
        <H1 className="!leading-[1.05]">Отправляйте документы с&nbsp;ZAP!</H1>
        <Button to={ACTION_LINK} text="оставить заявку" />
      </div>

      <Image className={cn('col-span-6', 'block w-full h-full object-contain')} quality={100} src={ActionImage} alt="Интерфейс Zap!" />
    </section>
  )
}
