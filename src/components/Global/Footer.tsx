import TelegramLogo from '$/socials/telegram.svg'
import WhatsAppLogo from '$/socials/whatsapp.svg'
import EmailLogo from '$/socials/email.svg'

import LogoBigImage from '$/logo-big.svg'
import FooterImage from '$/footer.png'
import MobileFooterImage from '$/footer-mobile.png'

import {ACTION_LINK, WEBSITE_BOX} from '@/lib/constants'
import {cn} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import {H4, P} from '~/UI/Typography'

const SOCIALS = {
  telegram: {
    icon: TelegramLogo,
    link: ACTION_LINK,
  },
  whatsapp: {
    icon: WhatsAppLogo,
    link: 'https://web.whatsapp.com', // https://web.whatsapp.com
  },
  email: {
    icon: EmailLogo,
    link: 'mailto:kirill@asseal.ae',
  },
}

export default function Footer() {
  const linkStyles = 'size-fit text-right border-b border-black/40 hover:border-transparent duration-200'

  return (
    <footer className={cn(WEBSITE_BOX, 'relative flex sm:flex-col items-end sm:items-start justify-between sm:gap-6', 'pt-16 pb-8 xl:pt-12 xl:pb-5 sm:pt-5 sm:pb-[25vh]', 'border-t-2 border-black')}>
      <Image className={cn('hidden sm:block', 'sm:w-[60vw]')} src={LogoBigImage} alt="Логотип ZAP!" />

      <div className="space-y-3 sm:space-y-2">
        <H4>Напишите нам!</H4>

        <div className="flex gap-2.5">
          {Object.entries(SOCIALS).map(([key, {icon, link}]) => (
            <Link href={link} target="_blank" rel="noopener noreferrer" key={key} className="group px-1.5 py-1 sm:px-1 sm:py-0.5 bg-green hover:bg-gray duration-300 rounded-xl sm:rounded-lg">
              <Image className="sm:size-11 group-hover:scale-[1.03] duration-300" src={icon} alt={`${key} icon`} />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end gap-16">
        <Image className={cn('sm:hidden', 'w-[27vw] xl:w-[30vw]')} src={LogoBigImage} alt="Логотип ZAP!" />

        <div className="sm:!mt-2 flex sm:flex-wrap gap-14 xl:gap-10 sm:gap-x-6 sm:gap-y-3.5 text-black/40">
          <Link className={linkStyles} href="#privacy-policy">
            <P>Privacy Policy</P>
          </Link>

          <Link className={linkStyles} href="#terms-conditions">
            <P>Terms & Conditions</P>
          </Link>

          <P>
            2024. © Zap! by{' '}
            <Link className={linkStyles} href="https://www.asseal.ae/" target="_blank" rel="noopener noreferrer">
              Asseal
            </Link>
            .
          </P>
        </div>
      </div>

      <Image quality={100} className={cn('sm:hidden', '-z-20 absolute bottom-0 left-0 w-full h-full object-cover')} src={FooterImage} alt="Персонаж ZAP!" />
      <Image quality={100} className={cn('hidden sm:block', '-z-20 absolute inset-0 w-full h-full object-cover')} src={MobileFooterImage} alt="Персонаж ZAP!" />
    </footer>
  )
}
