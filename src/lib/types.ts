export const USER_VIEWS = ['Отправителям', 'Путешественникам'] as const
export type UserType = (typeof USER_VIEWS)[number]

export const types = ['Контент', 'Изображение'] as const
export type GridItemType = (typeof types)[number]

export const colors = ['Зеленый', 'Черный', 'Серый'] as const
export type GridItemColor = (typeof colors)[number]

export type BlockView = 'desktop' | 'mobile'
