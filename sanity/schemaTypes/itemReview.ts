import {defineType} from 'sanity'

export const itemReview = defineType({
  name: 'itemReview',
  title: 'Элемент отзыва',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Имя',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Роль',
      options: {
        list: ['отправитель', 'путешественник'].map((value) => ({title: value, value})),
      },
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Текст',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'avatar',
      title: 'Изображение',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    },
  },
})
