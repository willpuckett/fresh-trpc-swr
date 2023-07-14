import { createSWRProxyHooks } from '@trpc-swr/client'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { url } from './url.ts'

import type { AppRouter } from './router.ts'

export const trpc = createSWRProxyHooks<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url,
    }),
  ],
})
