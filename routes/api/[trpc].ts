import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '../../trpc/router.ts'
import { Handler, HandlerContext } from '$fresh/server.ts'
import { createContext } from '../../trpc/router.ts'

export const handler: Handler = (request: Request, _ctx: HandlerContext) =>
  fetchRequestHandler({
    endpoint: '/api',
    req: request,
    router: appRouter,
    // ctx,
    createContext,
  })
