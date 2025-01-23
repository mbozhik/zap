'use client'

import LogoImage from '$/logo.svg'
import {WEBSITE_BOX, HEADER_LINKS, ACTION_LINK} from '@/lib/constants'

import {cn} from '@/lib/utils'
import {useEffect, useState} from 'react'
import {motion} from 'motion/react'

import Image from 'next/image'
import Link from 'next/link'
import {P} from '~/UI/Typography'
import Button from '~/UI/Button'

export default function Header() {
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsScrolling(false), 150)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <header className={cn('fixed z-50 w-full pt-3.5 sm:pt-0', WEBSITE_BOX, 'sm:px-0')}>
      <motion.div className={cn('grid items-center grid-cols-5 sm:flex sm:justify-between p-1.5 sm:py-2 bg-white duration-700 border-2 border-black rounded-xl sm:border-none', isScrolling && 'backdrop-blur-[8px] bg-opacity-70')}>
        <div className="pl-2 sm:pl-1">
          <Image className="w-28 sm:w-20" src={LogoImage} alt="Логотип ZAP!" />
        </div>

        <nav className="flex col-span-3 gap-6 justify-self-center sm:hidden">
          {Object.entries(HEADER_LINKS).map(([key, label]) => {
            return (
              <Link href={`/#${key}`} className="block lowercase duration-200 border-b border-transparent hover:border-black" key={key}>
                <P>{label}</P>
              </Link>
            )
          })}
        </nav>

        <Button animated={false} to={ACTION_LINK} className="px-6 xl:px-4 justify-self-end sm:text-base sm:px-3 sm:py-2" text="оставить заявку" />
      </motion.div>
    </header>
  )
}
