'use client'

import {cn} from '@/lib/utils'
import React from 'react'
import {motion} from 'motion/react'

type Props = {
  type: TypoTypes
  className?: string
  children: React.ReactNode
  animated?: boolean
  by?: 'word' | 'line'
  offset?: number
}

export type TypoTypes = keyof typeof typoClasses

export const typoClasses = {
  h1: 'text-[78px] xl:text-6xl sm:text-[34px] !leading-[1.1] tracking-tight sm:tracking-tighter font-bold uppercase',
  h2: 'text-[56px] xl:text-4xl sm:text-3xl !leading-[1.2] tracking-tighter font-bold',
  h3: 'text-[40px] xl:text-3xl sm:text-2xl font-bold',
  h4: 'text-[28px] xl:text-2xl sm:text-xl tracking-[-0.04em] font-semibold',
  p: 'text-xl xl:text-lg sm:text-lg',
  span: 'text-base',
} as const

function Typography({type, className, children, animated = false, by = 'line', offset = 250}: Props) {
  const Element = type

  const renderAnimatedText = () => {
    const textContent = React.Children.toArray(children)
      .filter((child) => typeof child === 'string')
      .join(' ')

    const segments = by === 'line' ? textContent.split('\n').filter(Boolean) : textContent.split(' ').filter(Boolean)

    const container = {
      hidden: {opacity: 0},
      visible: (i = 1) => ({
        opacity: 1,
        transition: {staggerChildren: 0.12, delayChildren: 0.04 * i},
      }),
    }

    const child = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          damping: 12,
          stiffness: 100,
        },
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: 'spring',
          damping: 12,
          stiffness: 100,
        },
      },
    }

    const typoClass = typoClasses[type]
    const combinedClassName = `${typoClass} ${className || ''}`

    return (
      <motion.div
        style={{overflow: 'hidden'}}
        variants={container}
        initial="hidden"
        whileInView="visible" // Trigger animation when in view
        viewport={{once: true, margin: `-${offset}px 0px`}}
        className={combinedClassName}
      >
        {React.createElement(
          type, // Use the `type` prop to dynamically create the element
          null,
          segments.map((segment, index) => (
            <motion.span key={index} variants={child} style={{display: 'inline-block', marginRight: by === 'word' ? '0.25em' : '0'}}>
              {segment}
              {by === 'word' && ' '}
            </motion.span>
          )),
        )}
      </motion.div>
    )
  }

  if (animated) {
    return renderAnimatedText()
  }

  return <Element className={cn(typoClasses[type], className)}>{children}</Element>
}

function createTypography(type: TypoTypes) {
  const Component = ({className, children, animated, by, offset}: Omit<Props, 'type'>) => (
    <Typography type={type} className={className} animated={animated} by={by} offset={offset}>
      {children}
    </Typography>
  )
  Component.displayName = `Typography(${type.toUpperCase()})`
  return Component
}

export const H1 = createTypography('h1')
export const H2 = createTypography('h2')
export const H3 = createTypography('h3')
export const H4 = createTypography('h4')
export const P = createTypography('p')
export const SPAN = createTypography('span')
