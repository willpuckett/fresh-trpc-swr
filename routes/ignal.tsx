import Ignal from '../islands/ignal.tsx'
import type { Handlers, PageProps } from '$fresh/server.ts'
import { caller } from '../trpc/caller.ts'

export const handler: Handlers = {
  async GET(req, ctx) {
    return ctx.render(await caller.post.list())
  },
}

export default ({ data }) => <Ignal data={data} />
