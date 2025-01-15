import {defineType, Rule, isDev, defineField} from 'sanity'

const types = ['Контент', 'Изображение'] as const
const colors = ['Зеленый', 'Черный', 'Серый'] as const

export type GridItemType = (typeof types)[number]
export type GridItemColor = (typeof colors)[number]

export const itemGrid = defineType({
  name: 'itemGrid',
  title: 'Элемент сетки',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Тип',
      description: `Допустимые значения: ${types.join(', ')}`,
      options: {
        list: types.map((value) => ({title: value, value})),
      },
      type: 'string',
      validation: (rule: Rule) => rule.required(),
      readOnly: !isDev,
    },

    {
      name: 'heading',
      title: 'Заголовок',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'Контент',
    },
    {
      name: 'caption',
      title: 'Подпись',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => parent?.type !== 'Контент',
    },
    {
      name: 'background',
      title: 'Задний фон',
      description: `Допустимые значения: ${colors.join(', ')}`,
      type: 'string',
      options: {
        list: colors.map((value) => ({title: value, value})),
      },
      hidden: ({parent}) => parent?.type !== 'Контент',
    },
    {
      name: 'icon',
      title: 'Иконка',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'Контент',
    },
    defineField({
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Подпись',
        },
      ],
      hidden: ({parent}) => parent?.type !== 'Изображение',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      type: 'type',
      image: 'image',
    },
    prepare(selection) {
      const {heading, type, image} = selection
      return {
        title: `${heading == undefined ? `(${image.alt})` : heading}`,
        subtitle: type,
        media: image,
      }
    },
  },
})
