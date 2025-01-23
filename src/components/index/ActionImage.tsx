'use client'

import backgroundHeroImage from '$/action/desktop-background.png'
import charactersHeroImage from '$/action/desktop.png'
import MobileActionImage from '$/action/mobile.png'

import type {BlockView} from '@/lib/types'

import {cn} from '@/lib/utils'
import React, {useRef, useState} from 'react'
import {motion} from 'motion/react'
import Image from 'next/image'

export default function ActionImage({visible}: {visible: BlockView}) {
  const ROTATION_RANGE = 30
  const HALF_ROTATION_RANGE = ROTATION_RANGE / 2

  const ref = useRef<HTMLDivElement>(null)

  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE

    const rY = mouseX / width - HALF_ROTATION_RANGE
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1

    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    setRotateX(0)
    setRotateY(0)
  }

  const IMAGE_STYLES = {
    default: 'block w-full h-full object-contain',
    visibility: {
      desktop: 'sm:hidden',
      mobile: 'hidden sm:block sm:!mt-3',
    },
  }

  if (visible === 'desktop') {
    return (
      <motion.section
        data-section="image-action"
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX,
          rotateY,
        }}
        className={cn('col-span-6 xl:ml-14 sm:ml-0 relative', IMAGE_STYLES.visibility.desktop)}
      >
        <Image
          priority={true}
          style={{
            transform: 'translateZ(100px)',
            transformStyle: 'preserve-3d',
          }}
          src={charactersHeroImage}
          className={cn('absolute', IMAGE_STYLES.default)}
          alt="Интерфейс ZAP!"
        />
        <Image
          priority={true}
          style={{
            transform: 'translateZ(50px)',
            transformStyle: 'preserve-3d',
          }}
          src={backgroundHeroImage}
          className={cn('relative z-20', IMAGE_STYLES.default)}
          alt="Интерфейс ZAP!"
        />
      </motion.section>
    )
  } else {
    return <Image data-section={`${visible}-image-action`} quality={100} className={cn(IMAGE_STYLES.default, IMAGE_STYLES.visibility.mobile)} src={MobileActionImage} alt="Интерфейс ZAP!" />
  }
}
