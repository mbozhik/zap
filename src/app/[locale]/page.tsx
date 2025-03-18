import {client, INDEX_QUERY, type LayoutData} from '@/lib/sanity'
import {WEBSITE_BOX} from '@/lib/constants'
import {cn} from '@/lib/utils'

import Hero from '~/index/Hero'
import Mechanics from '~/index/Mechanics'
import Description from '~/index/Description'
import Users from '~/index/Users'
import Advantages from '~/index/Advantages'
import Reviews from '~/index/Reviews'
import Questions from '~/index/Questions'
import Action from '~/index/Action'

export default async function IndexPage() {
  const pageData: LayoutData = await client.fetch(INDEX_QUERY)
  const {hero, mechanics, advantages, reviews, questions} = pageData

  return (
    <>
      <Hero data={hero} />

      <main className={cn(WEBSITE_BOX, 'py-20 sm:py-14', 'space-y-20 sm:space-y-14')}>
        <Mechanics data={mechanics} />
        <Description />
        <Users />
        <Advantages data={advantages} />
        <Reviews data={reviews} />
        <Questions data={questions} />
        <Action />
      </main>
    </>
  )
}
