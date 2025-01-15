import {defineType, defineField} from 'sanity'

export const itemMechanics = defineType({
  name: 'itemMechanics',
  title: 'Элемент механик',
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
    {
      name: 'image',
      title: 'Изображение',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    defineField({
      name: 'action',
      title: 'Действие',
      type: 'array',
      of: [
        defineField({
          name: 'actionItem',
          title: 'Элемент действия',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Метка',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'action',
              title: 'Действие',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'caption',
      media: 'image',
    },
  },
})
