import SWR from '@/islands/swr.tsx'
import { caller } from '@/trpc/caller.ts'
import Provider from '@/islands/Provider.tsx'

export default async () => {
  const data = await caller.post.list()
  return (
    <Provider>
      <SWR data={data} />
    </Provider>
  )
}
