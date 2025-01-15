import {client, USERS_QUERY, type UsersData} from '@/lib/sanity'
import {BLOCK_BOX} from '@/lib/constants'

import UsersModule from '~/index/UsersModule'

export default async function Users() {
  const usersData: UsersData = await client.fetch(USERS_QUERY)

  return (
    <section data-section="users-index" className={BLOCK_BOX}>
      <UsersModule data={usersData} />
    </section>
  )
}
