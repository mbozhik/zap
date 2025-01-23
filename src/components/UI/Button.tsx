'use client'

import {typoClasses} from '~/UI/Typography'
import {cn} from '@/lib/utils'

import {useRef, useState} from 'react'
import {motion} from 'motion/react'
import {useRouter} from 'next/navigation'
import {useMediaQuery} from '@/lib/use-media-query'

type Props = {
  to?: string
  text: string
  className?: string
  onClick?: () => void
  animated?: boolean
}

export const buttonStyles = cn(typoClasses.p, 'block size-fit px-14 xl:px-12 sm:px-6 py-2.5 xl:py-2 sm:py-2.5', 'lowercase text-center rounded-lg text-white bg-black border-2 border-transparent')
const buttonHover = 'hover:text-black hover:bg-green hover:border-black transition-colors duration-300'

export default function Button({to, text, className, onClick, animated = true}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState<{x: number; y: number}>({x: 0, y: 0})
  const router = useRouter()

  const isDesktop = useMediaQuery('(min-width: 768px)')

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ref.current) {
      const {clientX, clientY} = e
      const {height, width, left, top} = ref.current.getBoundingClientRect()
      const middleX = clientX - (left + width / 2)
      const middleY = clientY - (top + height / 2)

      const limitedX = Math.min(Math.max(middleX, -15), 15)
      const limitedY = Math.min(Math.max(middleY, -15), 15)

      setPosition({x: limitedX, y: limitedY})
    }
  }

  const reset = () => {
    setPosition({x: 0, y: 0})
  }

  const handleClick = () => {
    if (to) {
      router.push(to)
    } else if (onClick) {
      onClick()
    }
  }

  const {x, y} = position

  if (!isDesktop) {
    return (
      <button className={cn('relative', buttonStyles, buttonHover, className)} ref={ref} onClick={handleClick}>
        {text}
      </button>
    )
  }

  if (animated) {
    return (
      <motion.button className={cn('relative', buttonStyles, buttonHover, className)} ref={ref} transition={{type: 'spring', stiffness: 80, damping: 20, mass: 0.5}} onMouseMove={handleMouse} onMouseLeave={reset} onClick={handleClick} animate={{x, y}}>
        {text}
      </motion.button>
    )
  } else {
    return (
      <button className={cn('relative', buttonStyles, buttonHover, className)} ref={ref} onClick={handleClick}>
        {text}
      </button>
    )
  }
}
