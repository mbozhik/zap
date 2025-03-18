import {defineType, defineField, Rule} from 'sanity'
import {getLocaleVersion} from './index'

export const itemMechanics = defineType({
  name: 'itemMechanics',
  title: 'Элемент механик',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Заголовок',
      type: 'internationalizedArrayString',
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Подпись',
      type: 'internationalizedArrayExtraText',
      validation: (rule: Rule) => rule.required(),
    }),
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
            defineField({
              name: 'label',
              title: 'Метка',
              type: 'internationalizedArrayString',
              validation: (rule: Rule) => rule.required(),
            }),
            {
              name: 'action',
              title: 'Действие',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'action',
            },
            prepare(selection) {
              const {title, subtitle} = selection

              return {
                title: getLocaleVersion(title),
                subtitle,
              }
            },
          },
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
