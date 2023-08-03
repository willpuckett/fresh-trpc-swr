import { createSWRProxyHooks } from '@trpc-swr/client'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { IS_BROWSER } from '$fresh/runtime.ts'

export const trpc = createSWRProxyHooks<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: `${IS_BROWSER && document.location.origin}/api`,
    }),
  ],
})
