import type {QuestionBlock} from '@/lib/sanity'

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '~/UI/Accordion'
import {H1, H4, P} from '~/UI/Typography'

export default function Questions({data}: {data: QuestionBlock[]}) {
  return (
    <section data-section="questions-index" className="flex flex-col items-center gap-20 xl:gap-12 sm:gap-8 pt-12 xl:pt-8">
      <H1 className="sm:text-center">FAQ</H1>

      <div className="space-y-4">
        {data.map((item, idx) => (
          <Accordion key={idx} type="single" collapsible>
            <AccordionItem value={`question-${idx}`}>
              <AccordionTrigger>
                <H4>{item.question}</H4>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pr-10 pt-0">
                <P>{item.answer}</P>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  )
}
