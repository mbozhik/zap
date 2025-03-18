import {defineType, defineField, Rule} from 'sanity'
import {getLocaleVersion} from './index'

import {ROLES} from '../../src/lib/types'

export const itemReview = defineType({
  name: 'itemReview',
  title: 'Элемент отзыва',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Имя',
      type: 'internationalizedArrayString',
      validation: (rule: Rule) => rule.required(),
    }),
    {
      name: 'role',
      title: 'Роль',
      options: {
        list: ROLES.map((value) => ({title: value, value})),
      },
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    defineField({
      name: 'text',
      title: 'Текст',
      type: 'internationalizedArrayExtraText',
      validation: (rule: Rule) => rule.required(),
    }),
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

    prepare(selection) {
      const {title, subtitle, media} = selection

      return {
        title: getLocaleVersion(title),
        subtitle: getLocaleVersion(subtitle),
        media,
      }
    },
  },
})
