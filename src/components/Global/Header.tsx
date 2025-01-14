import LogoImage from '$/logo.svg'
import {WEBSITE_BOX, HEADER_LINKS, ACTION_LINK} from '@/lib/constants'

import {cn} from '@/lib/utils'

import Image from 'next/image'
import Link from 'next/link'
import {P} from '~/UI/Typography'
import Button from '~/UI/Button'

export default function Header() {
  return (
    <header className={cn('fixed z-50 w-full pt-3.5 sm:pt-0', WEBSITE_BOX, 'sm:px-0')}>
      <div className="grid items-center grid-cols-5 sm:flex sm:justify-between p-1.5 sm:py-2 bg-white border-2 border-black rounded-xl sm:border-none">
        <div className="pl-2 sm:pl-1">
          <Image className="w-28 sm:w-20" src={LogoImage} alt="Логотип Zap" />
        </div>

        <nav className="flex invisible col-span-3 gap-6 justify-self-center sm:hidden">
          {Object.entries(HEADER_LINKS).map(([key, label]) => {
            return (
              <Link href={`/#${key}`} className="block duration-200 border-b border-transparent hover:border-black" key={key}>
                <P>{label}</P>
              </Link>
            )
          })}
        </nav>

        <Button className="px-8 xl:px-6 justify-self-end sm:text-base sm:px-4 sm:py-2" to={ACTION_LINK} target="_blank" text="оставить заявку" />
      </div>
    </header>
  )
}
