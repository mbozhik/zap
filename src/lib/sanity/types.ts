import type {UserType, GridItemType, GridItemColor} from '@/lib/types'

import type {ImageProps} from 'next-sanity/image'

export type LayoutData = {
  hero: HeroBlock
  mechanics: MechanicsBlock[]
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

export type UsersData = {
  type: UserType
  grid: GridItem[]
}

export type GridItem = {
  type: GridItemType
  heading: string | null
  caption: string | null
  background: GridItemColor
  icon: string
  image: ImageProps
}
