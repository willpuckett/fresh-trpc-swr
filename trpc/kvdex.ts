import { createDb } from 'kvdex'
import { z } from 'zod'

export const Post = z.object({ title: z.string() })

const kv = await Deno.openKv()

export const db = createDb(kv, (builder) => ({
  posts: builder.collection<z.infer<typeof Post>>(['posts']),
}))
