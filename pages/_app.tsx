import 'styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { SWRConfig } from 'swr'
import { ToastContainer } from 'react-toastify'
import { Auth0Provider } from '@auth0/auth0-react'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Footer from 'components/Footer'
import Header from 'components/Header'

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
        redirectUri={process.browser && window.location.origin}
      >
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json())
          }}
        >
          <Head>
            <title>Roadmap Voting</title>
          </Head>

          <div className="antialiased max-w-xl mx-auto px-4">
            <Header />
            <main>
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>

          <ToastContainer autoClose={3000} hideProgressBar draggable={false} />
        </SWRConfig>
      </Auth0Provider>
    </ThemeProvider>
  )
}
