import {defineField, defineType, Rule, isDev} from 'sanity'

import React from 'react'
import {Users as UsersIcon} from 'lucide-react'

import {USER_VIEWS, type UserType} from '../../src/lib/types'

const isAllowedValue = (value: unknown): value is UserType =>
  typeof value === 'string' && USER_VIEWS.includes(value as UserType)

export const users = defineType({
  name: 'users',
  title: 'Пользователи',
  icon: UsersIcon as React.ElementType,
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Блок',
      description: `Допустимые значения: ${USER_VIEWS.join(', ')}`,
      type: 'string',
      options: {
        list: USER_VIEWS.map((value) => ({title: value, value})),
      },
      validation: (rule: Rule) =>
        rule
          .required()
          .custom((value) => (isAllowedValue(value) ? true : 'Недопустимое значение!')),
      readOnly: !isDev,
    },

    defineField({
      name: 'grid',
      title: 'Cетка',
      type: 'array',
      of: [{type: 'itemGrid'}],
      validation: (Rule) => Rule.required().min(5).max(5),
    }),
  ],
  preview: {
    select: {
      title: 'type',
    },
  },
})
