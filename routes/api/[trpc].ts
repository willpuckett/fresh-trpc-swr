import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter as router } from '@/trpc/router.ts'
import { createContext } from '@/trpc/router.ts'

export const handler: Handler = (req: Request, { state }) =>
  fetchRequestHandler({
    endpoint: '/api',
    req,
    router,
    createContext: (opts) => createContext({ ...opts, state }),
  })
