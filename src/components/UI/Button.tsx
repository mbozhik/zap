import {cn} from '@/lib/utils'
import Link from 'next/link'

type Props = {
  to: string
  target?: '_blank' | '_self'
  text: string
  className?: string
}

export default function Button({to, target = '_self', text, className}: Props) {
  return (
    <Link href={to} className={cn('block size-fit px-14 xl:px-12 py-3 xl:py-2.5 text-xl xl:text-lg text-white bg-black rounded-lg', 'hover:bg-black/85 duration-300', className)} target={target}>
      {text}
    </Link>
  )
}
