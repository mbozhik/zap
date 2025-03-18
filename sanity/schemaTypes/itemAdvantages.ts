import {defineType, defineField, Rule} from 'sanity'
import {getLocaleVersion} from './index'

export const itemAdvantages = defineType({
  name: 'itemAdvantages',
  title: 'Элемент преимуществ',
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
      name: 'icon',
      title: 'Иконка',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: 'heading',
      subtitle: 'caption',
    },

    prepare(selection) {
      const {title, subtitle} = selection

      return {
        title: getLocaleVersion(title),
        subtitle: getLocaleVersion(subtitle),
      }
    },
  },
})
