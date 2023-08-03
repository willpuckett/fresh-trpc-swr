import SWR from '@/islands/swr.tsx'
import { caller } from '@/trpc/caller.ts'
import Provider from '@/islands/Provider.tsx'

export default async (req, ctx) => {
  console.log('ctx', ctx)
  const data = await caller.post.list()
  return (
    <Provider>
      <SWR data={data} />
    </Provider>
  )
}
