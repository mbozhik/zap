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
      type: 'string',
      readOnly: !isDev,
    },

    defineField({
      name: 'hero',
      title: 'Стартовый блок',
      type: 'itemHero',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
