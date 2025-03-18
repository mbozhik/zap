import {defineType, defineField, Rule} from 'sanity'
import {getLocaleVersion} from './index'

export const itemQuestion = defineType({
  name: 'itemQuestion',
  title: 'Элемент вопросника',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Вопрос',
      type: 'internationalizedArrayString',
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Ответ',
      type: 'internationalizedArrayExtraText',
      validation: (rule: Rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
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
