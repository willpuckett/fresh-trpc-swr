import Nav, { Footer } from '../components/Nav.tsx'
import { AppProps } from '$fresh/server.ts'
import Provider from '../islands/Provider.tsx'
import { Head } from '$fresh/runtime.ts'

export default ({ Component, url }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <title>🍋 swr {url.pathname.split('/')[1]}</title>
        <meta
          name='🍋 swr'
          content='A demo of swr with trpc in Fresh'
        />
      </Head>
      <div class='m-auto max-w-screen-md lg:max-w-screen-xl'>
        <Nav active={url.pathname} />
        {/* use Provider island here to have trpc swr hooks available throughout the app, 
        or omit here and wrap islands by route */}
        <Provider>
          <div class='p-4 md:p-6 mt-4'>
            <Component />
          </div>
        </Provider>
        <Footer />
      </div>
    </>
  )
}
