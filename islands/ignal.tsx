import { useSignal } from '@preact/signals'
import { trpc } from '../trpc/proxy.ts'
import { inferRouterOutputs } from '@trpc/server'
import { appRouter } from '../trpc/router.ts'

const posts = await trpc.post.list.query()

export default function clientSide(
  { data }: { data?: inferRouterOutputs<typeof appRouter>['post']['list'] },
) {
  const text = useSignal('')

  return (
    <div>
      <label for='post'>Post Title :</label>
      <input
        class='border-1'
        value={text}
        onBlur={(e) => text.value = e.currentTarget && e.currentTarget.value}
        name='post'
      />
      <button
        class='border-1'
        onClick={() => {
          trpc.post.create.mutate({ title: text.value })
        }}
      >
        Create Post
      </button>
      <ul>
        {!posts ? <div>loading...</div> : posts.map((post) => (
          <li key={post.id}>
            {post.value.title}{' '}
            <button
              onClick={() => trpc.post.delete.mutate(post.id as string)}
            >
              ⌫
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
