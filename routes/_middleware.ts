import { getSessionAccessToken, getSessionId } from 'kv_oauth'
import { oauth2Client } from '@/trpc/auth.ts'

export const handler: MiddlewareHandler = async (req, ctx) => {
  const sessionId = await getSessionId(req)
  const isSignedIn = sessionId !== undefined
  const accessToken = isSignedIn
    ? await getSessionAccessToken(oauth2Client, sessionId)
    : null
  ctx.state = {
    ...ctx.state,
    isSignedIn,
    accessToken,
  }

  return ctx.next()
}
