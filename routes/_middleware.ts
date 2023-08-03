import { getSessionId, getSessionAccessToken } from 'kv_oauth'
import { oauth2Client } from '@/trpc/auth.ts'

export const handler: MiddlewareHandler = async (req, ctx) => {
  const sessionId = getSessionId(req)
  const isSignedIn = sessionId !== undefined
  const accessToken = isSignedIn
    ? await getSessionAccessToken(oauth2Client, sessionId)
    : null
  ctx.state.isSignedIn = isSignedIn
  ctx.state.accessToken = accessToken
  
  return ctx.next()
}