'use client'

import {typoClasses} from '~/UI/Typography'
import {cn} from '@/lib/utils'
import {useRef, useState} from 'react'
import {motion} from 'motion/react'
import {useRouter} from 'next/navigation'

type Props = {
  to?: string
  text: string
  className?: string
  onClick?: () => void
}

export default function Button({to, text, className, onClick}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState<{x: number; y: number}>({x: 0, y: 0})
  const router = useRouter()

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

  const buttonStyles = 'block size-fit px-14 xl:px-12 sm:px-6 py-3 sm:py-3.5 xl:py-2.5 lowercase text-center text-white bg-black rounded-lg'

  return (
    <motion.button className={cn('relative', buttonStyles, typoClasses.p, className)} ref={ref} transition={{type: 'spring', stiffness: 80, damping: 25, mass: 0.5}} onMouseMove={handleMouse} onMouseLeave={reset} onClick={handleClick} animate={{x, y}}>
      {text}
    </motion.button>
  )
}
