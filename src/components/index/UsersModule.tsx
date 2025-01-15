'use client'

import {USER_VIEWS, type UserType} from 'sanity/schemaTypes/users'
import {urlForImage, type UsersData, type GridItem} from '@/lib/sanity'

import {useState} from 'react'
import {twMerge} from 'tailwind-merge'
import {DynamicIcon} from 'lucide-react/dynamic'
import {cn} from '@/lib/utils'

import Image from 'next/image'
import Button from '~/UI/Button'
import {H4, P} from '~/UI/Typography'

export default function UsersModule({data}: {data: UsersData[]}) {
  const [activeView, setActiveView] = useState<UserType>('Отправителям')

  const activeData = data.find((item) => item.type === activeView)

  return (
    <section data-section="module-users-index" className="space-y-4">
      <div data-section="switch-module-users" className="flex sm:flex-col gap-2">
        {USER_VIEWS.map((view) => (
          <Button key={view} className={cn('hover:bg-black sm:w-full', activeView === view ? '' : 'bg-black/20 text-black hover:text-white')} onClick={() => setActiveView(view)} text={view} />
        ))}
      </div>

      <div data-section="grid-module-users">
        <div className={twMerge('grid grid-cols-12 auto-rows-fr gap-4 xl:gap-3 min-h-[65vh] sm:min-h-full', 'sm:flex sm:flex-col')}>
          {activeData?.grid.map((item, index) => (
            <GridItem item={item} idx={index} key={index} /> // Dynamic component
          ))}
        </div>
      </div>
    </section>
  )
}

function GridItem({item, idx}: {item: GridItem; idx: number}) {
  console.log('🚀 ~ GridItem ~ item:', item.icon)
  function getGridClass(idx: number) {
    const gridSpanClasses = [
      'col-span-4', // Top-left
      'col-span-3', // Top-middle
      'col-span-5 row-span-2', // Top-right (tall)
      'col-span-4', // Bottom-left
      'col-span-3', // Bottom-middle
    ]

    return gridSpanClasses[idx % gridSpanClasses.length]
  }

  function getBackgroundColor(background?: string) {
    if (background === 'Зеленый') return 'bg-green'
    if (background === 'Черный') return 'bg-black text-white'
    if (background === 'Серый') return 'bg-gray'
    return 'bg-gray'
  }

  function getIconColor(background?: string) {
    if (background === 'Зеленый') return 'text-black/10'
    if (background === 'Черный') return 'text-white/10'
    if (background === 'Серый') return 'text-black/10'
  }

  const cellStyles = twMerge('relative overflow-hidden', 'rounded-[32px] xl:rounded-3xl sm:rounded-2xl', getBackgroundColor(item.background), getGridClass(idx))

  if (item.type === 'Контент') {
    return (
      <div className={cn(cellStyles, 'p-6 xl:p-5 sm:py-6 flex flex-col justify-center gap-2.5')}>
        {item.heading && <H4 className="font-semibold !leading-[1.3]">{item.heading}</H4>}
        {item.caption && <P className="!leading-[1.4]">{item.caption}</P>}

        <DynamicIcon className={cn('absolute top-2 -right-10 size-48', getIconColor(item.background))} strokeWidth={1} name={item.icon} />
      </div>
    )
  } else if (item.type === 'Изображение') {
    return (
      <div className={cn(cellStyles, 'sm:h-[30vh]')}>
        <Image quality={100} fill={true} className="object-cover" src={urlForImage(item.image)} alt={item.image.alt} />
      </div>
    )
  } else {
    return null
  }
}
