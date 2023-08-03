import { RouteContext } from '$fresh/server.ts'

const HomePage = (_req: Request, ctx: RouteContext<never, State>) => {
  // const { isSignedIn, accessToken } = ctx.state
  console.log(ctx.state)  
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
      {/* <p>Signed in: {isSignedIn ? '✅' : '❌'}</p>
      <p>
        Your access token: {accessToken !== null
          ? (
            <span style='filter:blur(3px)'>
              {accessToken + ' (intentionally blurred for security)'}
            </span>
          )
          : '❌'}
      </p> */}
    </>
  )
}

export default HomePage
