import {BLOCK_BOX, ACTION_LINK} from '@/lib/constants'

import {H2} from '~/UI/Typography'
import Button from '~/UI/Button'

export default function Description() {
  return (
    <section id="description" data-section="description-index" className={`grid sm:flex sm:flex-col grid-cols-10 gap-16 sm:gap-4 items-center ${BLOCK_BOX}`}>
      <H2 className="col-span-7">Zap! соединяет отправителей, которым нужно срочно доставить документ в другую страну, и путешественников, которые летят тем же маршрутом. </H2>

      <Button className="w-full col-span-3 py-6" to={ACTION_LINK} text="присоединиться" />
    </section>
  )
}
