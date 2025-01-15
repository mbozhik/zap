import {BLOCK_BOX} from '@/lib/constants'

import UsersModule from '~/index/UsersModule'

export default function Users() {
  return (
    <section data-section="users-index" className={BLOCK_BOX}>
      <UsersModule />
    </section>
  )
}
