import {WEBSITE_BOX} from '@/lib/constants'
import {cn} from '@/lib/utils'

import Hero from '~/index/Hero'
import Description from '~/index/Description'

export default function IndexPage() {
  return (
    <>
      <Hero />

      <main className={cn(WEBSITE_BOX, 'py-20 sm:py-14')}>
        <Description />
      </main>
    </>
  )
}
