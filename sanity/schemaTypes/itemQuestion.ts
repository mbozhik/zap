import {defineType} from 'sanity'

export const itemQuestion = defineType({
  name: 'itemQuestion',
  title: 'Элемент вопросника',
  type: 'object',
  fields: [
    {
      name: 'question',
      title: 'Вопрос',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Ответ',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
  },
})
