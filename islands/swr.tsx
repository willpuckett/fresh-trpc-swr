import { useSignal } from '@preact/signals'
import { trpc } from '../trpc/swr.ts'

export default function clientSide() {
  const text = useSignal('')
  const { data: posts, error, mutate } = trpc.post.list.useSWR()
  const createPost = trpc.post.create.useSWRMutation().trigger
  const deletePost = trpc.post.delete.useSWRMutation().trigger
  return (
    <div>
      <input
        class='border-1'
        value={text}
        onBlur={(e) => text.value = e.currentTarget && e.currentTarget.value}
      />
      <button
        class='border-1'
        onClick={ () => {
           createPost({ title: text.value }, { onSuccess: () => 
        {    
          mutate() 
          text.value = ''
        }
           })
        }}
      >
        Create Post
      </button>
      <ul>
        {error && <div>failed to load</div> ||
            !posts
          ? <div>loading...</div>
          : posts.map((post) => (
            <li key={post.id}>
              {post.value.title}{' '}
              <button
                onClick={ () => deletePost(post.id as string, {onSuccess: () => mutate()})}
              >
                ⌫
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
