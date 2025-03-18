import {defineType, defineField, Rule} from 'sanity'
import {getLocaleVersion} from './index'

export const itemHero = defineType({
  name: 'itemHero',
  title: 'Элемент стартового блока',
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
