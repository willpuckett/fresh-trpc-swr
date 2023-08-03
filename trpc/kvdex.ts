import { createDb } from 'kvdex'
import { z } from 'zod'

export const post = z.object({ title: z.string() })
export type Post = z.infer<typeof post>

const kv = await Deno.openKv()

export const db = createDb(kv, (builder) => ({
  posts: builder.collection<Post>(['posts']),
}))
