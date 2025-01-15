'use client'

import {USER_VIEWS, type UserType} from 'sanity/schemaTypes/users'
import {urlForImage, type UsersData, type GridItem} from '@/lib/sanity'

import {cn} from '@/lib/utils'
import {useState} from 'react'

import Button from '~/UI/Button'
import Image from 'next/image'

export default function UsersModule({data}: {data: UsersData[]}) {
  const [activeView, setActiveView] = useState<UserType>('Отправителям')

  const activeData = data.find((item) => item.type === activeView)

  return (
    <section data-section="module-users-index" className="space-y-4">
      <div data-section="switch-module-users" className="flex gap-2">
        {USER_VIEWS.map((view) => (
          <Button key={view} className={cn('hover:bg-black', activeView === view ? '' : 'bg-black/50')} onClick={() => setActiveView(view)} text={view} />
        ))}
      </div>

      <div data-section="grid-module-users">
        <div className="grid grid-cols-3 gap-4">
          {activeData?.grid.map((item, idx) => (
            <GridItem item={item} key={idx} /> // Dynamic component
          ))}
        </div>
      </div>
    </section>
  )
}

function GridItem({item}: {item: GridItem}) {
  if (item.type === 'Контент') {
    return (
      <div className={`p-4 bg-${item.background.toLowerCase()}-500`}>
        {item.icon && <mark>{item.icon}</mark>}
        {item.heading && <h4 className="font-bold">{item.heading}</h4>}
        {item.caption && <p>{item.caption}</p>}
      </div>
    )
  } else if (item.type === 'Изображение') {
    return (
      <div className="relative w-full h-64">
        <Image className="object-cover" src={urlForImage(item.image)} alt={item.heading || 'Image'} layout="fill" />
      </div>
    )
  } else {
    return null
  }
}
