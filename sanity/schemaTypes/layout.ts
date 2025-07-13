import {defineField, defineType, isDev} from 'sanity'

import React from 'react'
import {Layers} from 'lucide-react'

export const layout = defineType({
  name: 'layout',
  title: 'Макет',
  icon: Layers as React.ElementType,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название',
      description: '(Технический параметр)',
      type: 'string',
      readOnly: !isDev,
    },

    defineField({
      name: 'hero',
      title: 'Стартовый блок',
      type: 'itemHero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mechanics',
      title: 'Механики',
      type: 'array',
      of: [{type: 'itemMechanics'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'advantages',
      title: 'Преимущества',
      type: 'array',
      of: [{type: 'itemAdvantages'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'questions',
      title: 'Вопросы',
      type: 'array',
      of: [{type: 'itemQuestion'}],
      validation: (Rule) => Rule.required().min(2),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
