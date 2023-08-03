import { Signal, useSignal } from '@preact/signals'
import { trpc } from '@/trpc/proxy.ts'

export default function clientSide(
  { posts }: { posts: Signal<RouterOutput['post']['list']> },
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
        type='submit'
        onClick={async (e) => {
          await trpc.post.create.mutate({ title: text.value })
          posts.value = await trpc.post.list.query()
          text.value = ''
        }}
      >
        Create Post
      </button>
      <ul>
        {posts.value.map((post) => (
          <li key={post.id}>
            {post.title}{' '}
            <button
              onClick={() => trpc.post.delete.mutate(post.id)}
            >
              ⌫
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
