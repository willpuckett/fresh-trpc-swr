import type { Handlers } from '$fresh/server.ts'
import { handleCallback } from 'kv_oauth'
import {oauth2Client} from '../../trpc/router.ts'


export const handler: Handlers = {
  async GET(req) {
    // Return object also includes `accessToken` and `sessionId` properties.
    const { response } = await handleCallback(req, oauth2Client)
    return response
  },
}
