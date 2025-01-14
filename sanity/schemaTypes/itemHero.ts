import {defineField, defineType} from 'sanity'

export const itemHero = defineType({
  name: 'itemHero',
  title: 'Элемент стартового блока',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Подпись',
      type: 'array',
      of: [{type: 'text', rows: 2}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
