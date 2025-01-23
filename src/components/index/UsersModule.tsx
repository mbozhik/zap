'use client'

import {USER_VIEWS, type UserType} from '@/lib/types'
import {urlForImage, type UsersData, type GridItem} from '@/lib/sanity'
import {CARD_ROUNDED} from '@/lib/constants'
import {buttonStyles} from '~/UI/Button'

import {cn} from '@/lib/utils'
import {useState} from 'react'
import {twMerge} from 'tailwind-merge'
import {AnimatePresence, motion} from 'motion/react'

import Image from 'next/image'
import {H4, P} from '~/UI/Typography'
import DynamicIcon from '~/UI/DynamicIcon'

const transition = {duration: 0.3, ease: 'easeInOut'}
const variants = {
  enter: {opacity: 0, y: -30, filter: 'blur(4px)'},
  center: {opacity: 1, y: 0, filter: 'blur(0px)'},
  exit: {opacity: 0, y: 30, filter: 'blur(4px)'},
}

export default function UsersModule({data}: {data: UsersData[]}) {
  const [activeView, setActiveView] = useState<UserType>('Отправителям')

  const activeIndex = USER_VIEWS.indexOf(activeView)
  const activeData = data.find((item) => item.type === activeView)

  return (
    <section data-section="module-users" className="space-y-4">
      <div data-section="switch-module" className="flex sm:flex-row gap-2 sm:gap-1">
        {USER_VIEWS.map((view, idx) => (
          <button key={idx} onClick={() => setActiveView(view)} className={cn(buttonStyles, idx == 1 && 'sm:w-full', 'px-10 xl:px-10 sm:px-5 sm:text-sm sm:py-3 duration-300', activeView === view ? '' : 'bg-black/20 text-black hover:bg-black/30')}>
            {view}
          </button>
        ))}
      </div>

      <div data-section="grid-module" className="overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div key={activeIndex} initial="enter" animate="center" exit="exit" variants={variants} transition={transition}>
            <div className={twMerge('grid grid-cols-12 auto-rows-fr gap-4 xl:gap-3 min-h-[65vh] sm:min-h-full', 'sm:flex sm:flex-col')}>
              {activeData?.grid.map(
                (item, key) => <GridItem item={item} idx={key} key={key} />, // Dynamic component
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function GridItem({item, idx}: {item: GridItem; idx: number}) {
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
    if (background === 'Зеленый') return 'text-black opacity-10'
    if (background === 'Черный') return 'text-white opacity-10'
    if (background === 'Серый') return 'text-black opacity-10'
  }

  const cellStyles = twMerge('relative overflow-hidden', CARD_ROUNDED, getBackgroundColor(item.background), getGridClass(idx))

  if (item.type === 'Контент') {
    return (
      <div className={cn(cellStyles, 'p-6 xl:p-5 sm:py-6 flex flex-col justify-center gap-2.5')}>
        {item.heading && <H4 className="!leading-[1.3]">{item.heading}</H4>}
        {item.caption && <P className="!leading-[1.4]">{item.caption}</P>}

        <DynamicIcon className={cn('absolute top-2 -right-10 size-48', getIconColor(item.background))} name={item.icon} />
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
