type FetchCreateContextFnOptions =
  import('@trpc/server/adapters/fetch').FetchCreateContextFnOptions

/** The Middleware ctx state for Fresh server. */
declare interface State {
  // user: User | null
  isSignedIn: boolean
  accessToken: null | string
}

/** The Middleware ctx state for trpc. */
declare interface CreateContextOptions extends FetchCreateContextFnOptions {
  state: State
}

/** App Wrapper. Should be generic for State but waiting for upstream fix */
declare type AppProps = import('$fresh/server.ts').AppProps

/**  With the new async components, we don't need to pass data generally*/
declare type Handler<T = never, S = State> = import('$fresh/server.ts').Handler<
  T,
  S
>

/**  With the new async components, we don't usually need to pass data*/
declare type Handlers<T = never, S = State> =
  import('$fresh/src/server/types.ts').Handlers<T, S>

/**  All our middleware shares State*/
declare type MiddlewareHandler = import('$fresh/server.ts').MiddlewareHandler<
  State
>

/**  Not Passing data to the route. This is still not quite right in main*/
declare type AsyncRoute<T = never, S = State> =
  import('https://pax.deno.dev/denoland/fresh@main/src/server/types.ts').AsyncRoute<
    T,
    S
  >

declare type Post = import('@/trpc/kvdex.ts').Post

declare type AppRouter = typeof import('@/trpc/router.ts').appRouter
declare type RouterInput = import('@trpc/server').inferRouterInputs<AppRouter>
declare type RouterOutput = import('@trpc/server').inferRouterOutputs<AppRouter>
