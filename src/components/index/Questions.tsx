import {BLOCK_BOX, ACTION_LINK} from '@/lib/constants'
import type {QuestionBlock} from '@/lib/sanity'

import {cn} from '@/lib/utils'

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '~/UI/Accordion'
import {H1, H4, P} from '~/UI/Typography'
import Button from '~/UI/Button'

export default function Questions({data}: {data: QuestionBlock[]}) {
  return (
    <section id="faq" data-section="questions-index" className={cn(BLOCK_BOX, 'flex flex-col items-center gap-20 xl:gap-12 sm:gap-8 pt-12 xl:pt-8 sm:pt-0')}>
      <H1 className="sm:text-center">FAQ</H1>

      <Accordion className="flex flex-col gap-4 xl:gap-3 max-w-7xl" type="single" collapsible>
        {data.map((item, idx) => (
          <AccordionItem className="space-y-2.5 sm:space-y-3" value={`question-${idx}`} key={idx}>
            <AccordionTrigger className="px-6 py-4 sm:pl-4 sm:py-3 sm:pr-2.5 space-y-2 rounded-xl border-2 border-black">
              <H4 animated className="sm:leading-[1.2]">
                {item.question}
              </H4>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pr-10 pb-4 xl:pb-3 sm:pb-2 sm:px-4">
              <P animated>{item.answer}</P>
            </AccordionContent>
          </AccordionItem>
        ))}

        <div className="flex sm:flex-col sm:gap-3.5 items-center justify-between p-2.5 pl-6 sm:pl-2.5 bg-black rounded-xl">
          <H4 animated className="text-white sm:text-center sm:max-w-[20ch] sm:leading-[1.25]">
            Остались вопросы? Напишите нам
          </H4>

          <Button to={ACTION_LINK} className={cn('px-28 xl:px-16 py-4 bg-green text-black', 'sm:w-full sm:py-2')} text="связаться с нами" />
        </div>
      </Accordion>
    </section>
  )
}
