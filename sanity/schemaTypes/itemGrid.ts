import {defineType, defineField, Rule, isDev} from 'sanity'
import {getLocaleVersion} from './index'

import {types, colors} from '../../src/lib/types'

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

    defineField({
      name: 'heading',
      title: 'Заголовок',
      type: 'internationalizedArrayString',
      hidden: ({parent}) => parent?.type !== 'Контент',
    }),
    defineField({
      name: 'caption',
      title: 'Подпись',
      type: 'internationalizedArrayExtraText',
      hidden: ({parent}) => parent?.type !== 'Контент',
    }),
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
      title: 'heading',
      subtitle: 'type',
      media: 'image',
    },

    prepare(selection) {
      const {title, subtitle, media} = selection

      return {
        title: `${title == undefined ? `(${media.alt})` : getLocaleVersion(title)}`,
        subtitle: getLocaleVersion(subtitle),
        media,
      }
    },
  },
})
