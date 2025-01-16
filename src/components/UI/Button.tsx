import {cn} from '@/lib/utils'

import Link from 'next/link'
import {typoClasses} from '~/UI/Typography'

type Props = {
  to?: string
  target?: '_blank' | '_self'
  text: string
  className?: string
  onClick?: () => void
}

export default function Button({to, target = '_blank', text, className, onClick}: Props) {
  const buttonStyles = 'block size-fit px-14 xl:px-12 sm:px-6 py-3 sm:py-3.5 xl:py-2.5 lowercase text-center text-white bg-black rounded-lg hover:bg-opacity-85 duration-300'

  if (to) {
    return (
      <Link href={to} className={cn(buttonStyles, typoClasses.p, className)} target={target}>
        {text}
      </Link>
    )
  }

  return (
    <button className={cn(buttonStyles, typoClasses.p, className)} onClick={onClick}>
      {text}
    </button>
  )
}
