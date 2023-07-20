import { createTRPCProxyClient } from '@trpc/client'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { url } from './url.ts'

import type { AppRouter } from './router.ts'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url,
    }),
  ],
})
