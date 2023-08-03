import { initTRPC, TRPCError } from '@trpc/server'
import { db, post } from '@/trpc/kvdex.ts'
import { z } from 'zod'

export const createContext = (
  { req, resHeaders, state }: CreateContextOptions,
) => {
  const { isSignedIn } = state
  return {
    req,
    resHeaders,
    isSignedIn,
  }
}

const t = initTRPC.context<typeof createContext>().create()

const publicProcedure = t.procedure
const router = t.router
const middleware = t.middleware

const authMiddleware = middleware(({ next, ctx }) => {
  const { isSignedIn } = ctx
  if (isSignedIn) return next()
  else throw new TRPCError({ code: 'UNAUTHORIZED' })
})

export const authProcedure = publicProcedure.use(authMiddleware)

const postRouter = router({
  create: authProcedure
    .input(post)
    .mutation(({ input }) => {
      const post = db.posts.add(input)
      return post
    }),
  list: publicProcedure.query(async () => {
    const { result } = await db.posts.getMany()
    const flat = result.map((post) => {
      const { id, value } = post
      return {
        id: id as string,
        ...value,
      }
    })
    return flat
  }),

  delete: authProcedure.input(z.string()).mutation(({ input }) => {
    db.posts.delete(input)
  }),
})

export const appRouter = router({
  post: postRouter,
})
