'use client'

import {cn} from '@/lib/utils'
import {useState} from 'react'

import Button from '~/UI/Button'

const views = ['Отправителям', 'Путешественникам'] as const
type Users = (typeof views)[number]

export default function UsersModule() {
  const [activeView, setActiveView] = useState<Users>('Отправителям')

  return (
    <section data-section="module-users-index" className="space-y-4">
      <div className="flex gap-2">
        {views.map((view) => (
          <Button key={view} className={cn('hover:bg-black', activeView === view ? '' : 'bg-black/50')} onClick={() => setActiveView(view)} text={view} />
        ))}
      </div>

      <p>Контент для {activeView === 'Отправителям' ? 'отправителей' : 'путешественников'} здесь.</p>
    </section>
  )
}
