import type { Handlers } from '$fresh/server.ts'
import { handleCallback } from 'kv_oauth'
import { createGitHubOAuth2Client } from 'kv_oauth'

export const oauth2Client = createGitHubOAuth2Client()
export const handler: Handlers = {
  async GET(req) {
    // Return object also includes `accessToken` and `sessionId` properties.
    const { response } = await handleCallback(req, oauth2Client)
    return response
  },
}
