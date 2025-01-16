import {cn} from '@/lib/utils'

type Props = {
  type: TypoTypes
  className?: string
  children: React.ReactNode
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

function Typography({type, className, children}: Props) {
  const Element = type
  return <Element className={cn(typoClasses[type], className)}>{children}</Element>
}

function createTypography(type: TypoTypes) {
  const Component = ({className, children}: Omit<Props, 'type'>) => (
    <Typography type={type} className={className}>
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
