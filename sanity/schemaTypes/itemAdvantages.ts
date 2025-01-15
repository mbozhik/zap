import {defineType} from 'sanity'

export const itemAdvantages = defineType({
  name: 'itemAdvantages',
  title: 'Элемент преимуществ',
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
      rows: 6,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Иконка',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
})
