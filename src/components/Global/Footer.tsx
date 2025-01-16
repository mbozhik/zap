import LogoBigImage from '$/logo-big.svg'

import {WEBSITE_BOX} from '@/lib/constants'

import {cn} from '@/lib/utils'
import Image from 'next/image'

import {H4} from '~/UI/Typography'

export default function Footer() {
  return (
    <footer className={cn(WEBSITE_BOX, 'pt-20 pb-10', 'border-t-2 border-black')}>
      <div className="">
        <H4>Напишите нам!</H4>

        <div className="flex gap-2">
          {['Telegram', 'WhatsApp', 'Email'].map((item) => (
            <mark className="bg-green px-1" key={item}>
              {item}
            </mark>
          ))}
        </div>
      </div>

      <div>
        <Image src={LogoBigImage} alt="Логотип ZAP!" />
      </div>
    </footer>
  )
}
