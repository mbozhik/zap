import type {UserType, GridItemType, GridItemColor} from '@/lib/types'

import type {ImageProps} from 'next-sanity/image'
import type {IconName} from 'lucide-react/dynamic'

export type LayoutData = {
  hero: HeroBlock
  mechanics: MechanicsBlock[]
  advantages: AdvantageBlock[]
  reviews: ReviewBlock[]
}

export type HeroBlock = {
  heading: string
  caption: string
}

export type MechanicsBlock = {
  image: ImageProps
  heading: string
  caption: string
  action?: {
    label: string
    action: string
  }[]
}

export type AdvantageBlock = {
  heading: string
  caption: string
  icon: IconName
}

export type ReviewBlock = {
  name: string
  role: string
  text: string
  avatar: ImageProps
}

export type UsersData = {
  type: UserType
  grid: GridItem[]
}

export type GridItem = {
  type: GridItemType
  heading: string | null
  caption: string | null
  background: GridItemColor
  icon: IconName
  image: ImageProps
}
