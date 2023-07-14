import type { Handlers, PageProps } from '$fresh/server.ts'
import { getSessionAccessToken, getSessionId } from 'kv_oauth'
import { oauth2Client } from '../trpc/auth.ts'

interface Data {
  isSignedIn: boolean
  accessToken: null | string
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const sessionId = await getSessionId(req)
    const isSignedIn = sessionId !== null
    const accessToken = isSignedIn
      ? await getSessionAccessToken(oauth2Client, sessionId)
      : null

    return ctx.render({ isSignedIn, accessToken })
  },
}

export default function HomePage(props: PageProps<Data>) {
  const { isSignedIn, accessToken } = props.data
  return (
    <>
      <br />
      <p>This is a sample of using tRPC with Fresh</p>
      <ul>
        <li>
          <a class='text-blue-500' href='/server'>Server Side</a>
        </li>
        <li>
          <a class='text-blue-500' href='/swr'>swr</a>
        </li>
      </ul>
      <br />
      <p>Provider: GitHub</p>
      <p>Signed in: {isSignedIn ? '✅' : '❌'}</p>
      <p>
        Your access token: {accessToken !== null
          ? (
            <span style='filter:blur(0px)'>
              {accessToken + ' (intentionally blurred for security)'}
            </span>
          )
          : '❌'}
      </p>
    </>
  )
}
