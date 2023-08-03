import Ignal from '@/islands/ignal.tsx'
import { caller } from '@/trpc/caller.ts'
import { signal } from '@preact/signals'

export default async () => {
  const posts = signal<RouterOutput['post']['list']>([])
  posts.value = await caller.post.list()
  return <Ignal posts={posts} />
}
