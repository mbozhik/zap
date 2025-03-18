import type {Locale} from '@/i18n/routing'
import type {UserType, RoleType, GridItemType, GridItemColor} from '@/lib/types'

import type {ImageProps} from 'next-sanity/image'
import type {IconName} from 'lucide-react/dynamic'

export type LocalizedValue = {
  _type: unknown
  _key: Locale
  value: string
}

export type LayoutData = {
  hero: HeroBlock
  mechanics: MechanicsBlock[]
  advantages: AdvantageBlock[]
  reviews: ReviewBlock[]
  questions: QuestionBlock[]
}

export type HeroBlock = {
  heading: LocalizedValue[]
  caption: LocalizedValue[]
}

export type MechanicsBlock = {
  image: ImageProps
  heading: LocalizedValue[]
  caption: LocalizedValue[]
  action?: {
    label: LocalizedValue[]
    action: string
  }[]
}

export type AdvantageBlock = {
  heading: LocalizedValue[]
  caption: LocalizedValue[]
  icon: IconName
}

export type ReviewBlock = {
  name: LocalizedValue[]
  role: RoleType
  text: LocalizedValue[]
  avatar: ImageProps
}

export type QuestionBlock = {
  question: LocalizedValue[]
  answer: LocalizedValue[]
}

// Пользователи
export type UsersData = {
  type: UserType
  grid: GridItem[]
}

export type GridItem = {
  type: GridItemType
  heading: LocalizedValue[] | null
  caption: LocalizedValue[] | null
  background: GridItemColor
  icon: IconName
  image: ImageProps
}
