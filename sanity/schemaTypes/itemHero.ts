import {defineType} from 'sanity'

export const itemHero = defineType({
  name: 'itemHero',
  title: 'Элемент стартового блока',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Подпись',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    },
  ],
})
