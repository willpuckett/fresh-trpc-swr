import { appRouter } from '@/trpc/router.ts'

export const caller = appRouter.createCaller({
  req: new Request('https://tropic.deno.dev'),
  resHeaders: new Headers(),
  isSignedIn: true,
})
