import 'styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { ToastContainer } from 'react-toastify'
import { GlobalStoreProvider } from '@/store/index'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Footer from '@/components/footer'
import Header from '@/components/header'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json())
          }}
        >
          <GlobalStoreProvider>
            <Head>
              <title>Roadmap Voting</title>
            </Head>

            <div className="max-w-xl mx-auto px-4">
              <Header />
              <main>
                <Component {...pageProps} />
              </main>
              <Footer />
            </div>

            <ToastContainer
              autoClose={3000}
              hideProgressBar
              draggable={false}
            />
          </GlobalStoreProvider>
        </SWRConfig>
      </ThemeProvider>
    </SessionProvider>
  )
}
