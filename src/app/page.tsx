import {WEBSITE_BOX} from '@/lib/constants'
import {cn} from '@/lib/utils'

import Hero from '~/index/Hero'
import Mechanics from '~/index/Mechanics'
import Description from '~/index/Description'

export default function IndexPage() {
  return (
    <>
      <Hero />

      <main className={cn(WEBSITE_BOX, 'py-20 sm:py-14', 'space-y-20 sm:space-y-14')}>
        <Mechanics />
        <Description />
      </main>
    </>
  )
}
