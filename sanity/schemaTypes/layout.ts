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
      description: 'Только один элемент массива',
      type: 'array',
      of: [{type: 'itemHero'}],
      validation: (Rule) => Rule.required().min(1).max(1),
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
      name: 'reviews',
      title: 'Отзывы',
      description: 'Минимум 4 элемента',
      type: 'array',
      of: [{type: 'itemReview'}],
      validation: (Rule) => Rule.required().min(4),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
