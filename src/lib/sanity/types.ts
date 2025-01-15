export type LayoutData = {
  hero: HeroBlock
  mechanics: MechanicsBlock[]
}

export type HeroBlock = {
  heading: string
  caption: string
}

export type MechanicsBlock = {
  image: never
  heading: string
  caption: string
  action?: {
    label: string
    action: string
  }[]
}
