'use client'

import {typoClasses} from '~/UI/Typography'

import {cn} from '@/lib/utils'
import {useRef, useState} from 'react'
import {motion} from 'motion/react'

import Link from 'next/link'

type Props = {
  to?: string
  target?: '_blank' | '_self'
  text: string
  className?: string
  onClick?: () => void
}

export default function Button({to, target = '_blank', text, className, onClick}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState<{x: number; y: number}>({x: 0, y: 0})

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

  const {x, y} = position

  const buttonStyles = 'block size-fit px-14 xl:px-12 sm:px-6 py-3 sm:py-3.5 xl:py-2.5 lowercase text-center text-white bg-black rounded-lg'

  return (
    <motion.button ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} animate={{x, y}} transition={{type: 'spring', stiffness: 80, damping: 25, mass: 0.5}} className="relative">
      {to ? (
        <Link href={to} className={cn(buttonStyles, typoClasses.p, className)} target={target}>
          {text}
        </Link>
      ) : (
        <div className={cn(buttonStyles, typoClasses.p, className)} onClick={onClick}>
          {text}
        </div>
      )}
    </motion.button>
  )
}
