import type { Handlers } from '$fresh/server.ts'
import { signIn } from 'kv_oauth'
import { oauth2Client } from '../../trpc/auth.ts'

export const handler: Handlers = {
  async GET(req) {
    return await signIn(req, oauth2Client)
  },
}
