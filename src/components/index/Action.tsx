import {ACTION_LINK} from '@/lib/constants'
import {cn} from '@/lib/utils'

import {H1} from '~/UI/Typography'
import Button from '~/UI/Button'
import ActionImage from '~/index/ActionImage'

export default function Action() {
  return (
    <section data-section="action-index" className={cn('grid-cols-10', 'grid items-center xl:gap-20', 'sm:flex sm:flex-col')}>
      <div className={cn('col-span-4', 'space-y-6 xl:space-y-5 sm:space-y-6')}>
        <H1 animated by="word" offset={250} className="!leading-[1.05]">
          Отправляйте документы с&nbsp;ZAP!
        </H1>

        <ActionImage visible="mobile" />

        <Button to={ACTION_LINK} className="sm:w-full" text="оставить заявку" />
      </div>

      <ActionImage visible="desktop" />
    </section>
  )
}
