import { caller } from '@/trpc/caller.ts'

const Page: AsyncRoute = async (req, ctx) => {
  console.log('ctx', ctx)
  const { searchParams } = new URL(req.url)
  const post = searchParams.get('post')
  if (post) await caller.post.create({ title: post })
  const deleteID = searchParams.get('deleteID')
  if (deleteID) await caller.post.delete(deleteID)
  const posts = await caller.post.list()

  return (
    <div>
      <form>
        <label for='post'>Post Title :</label>
        <input class='border-1' type='text' name='post' />
        <button class='border-1' type='submit'>Create Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} <a href={`/server?deleteID=${post.id}`}>⌫</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
