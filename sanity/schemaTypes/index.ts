import {layout} from './layout'
import {itemHero} from './itemHero'
import {itemMechanics} from './itemMechanics'
import {users} from './users'
import {itemGrid} from './itemGrid'
import {itemAdvantages} from './itemAdvantages'
import {itemReview} from './itemReview'
import {itemQuestion} from './itemQuestion'

export const getLocaleVersion = (field: unknown, locale = 'ru') =>
  Array.isArray(field)
    ? field.find((item) => item._key === locale)?.value || field[0]?.value
    : field

export const schemaTypes = [
  layout,
  itemHero,
  itemMechanics,
  users,
  itemGrid,
  itemAdvantages,
  itemReview,
  itemQuestion,
]
