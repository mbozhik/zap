import type {QuestionBlock} from '@/lib/sanity'

import {H1, H4, P} from '~/UI/Typography'

export default function Questions({data}: {data: QuestionBlock[]}) {
  return (
    <section data-section="questions-index" className="flex flex-col items-center gap-20 xl:gap-12 sm:gap-8 pt-12 xl:pt-8">
      <H1 className="sm:text-center">FAQ</H1>

      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="px-6 py-4 space-y-2 rounded-xl border-2 border-black">
            <H4>{item.question}</H4>
            <P className="pr-5">{item.answer}</P>
          </div>
        ))}
      </div>
    </section>
  )
}
