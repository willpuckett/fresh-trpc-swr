import { appRouter } from './router.ts'

export const caller = appRouter.createCaller({
  req: new Request(new URL('https://tropic.deno.dev')),
  resHeaders: new Headers(),
})
