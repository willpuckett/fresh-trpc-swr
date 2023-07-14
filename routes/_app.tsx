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
      <Nav active={url.pathname} />
      {/* use Provider island here to have trpc use query available throughout the app */}
      <Provider>
        <div class='m-auto max-w-screen-md lg:max-w-screen-xl'>
          <div class='p-4 md:p-6 mt-4'>
            <Component />
          </div>
        </div>
      </Provider>
      <Footer />
    </>
  )
}
