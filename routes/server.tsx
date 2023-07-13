import { HandlerContext, PageProps } from '$fresh/server.ts'
import { caller } from '../trpc/caller.ts'
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '../trpc/router.ts'

type RouterOutput = inferRouterOutputs<AppRouter>

export async function handler(req: Request, ctx: HandlerContext) {
  const { searchParams } = new URL(req.url)
  const post = searchParams.get('post')
  if (post) await caller.post.create({ title: post })
  const deleteID = searchParams.get('deleteID')
  if (deleteID) await caller.post.delete(deleteID)
  const posts = await caller.post.list()
  return ctx.render({ posts })
}

export default function Page({ data: { posts } }: PageProps<{
  posts: RouterOutput['post']['list']
}>) {
  return (
    <div>
      <form>
        <input class='border-1' type='text' name='post' />
        <button class='border-1' type='submit'>Create Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.value.title} <a href={`/server?deleteID=${post.id}`}>⌫</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
