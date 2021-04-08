import './styles.css'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import Footer from '../components/footer'
import { Auth0Provider } from '@auth0/auth0-react'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.browser && window.location.origin}
    >
      <Head>
        <title>Roadmap Voting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="antialiased max-w-xl mx-auto px-4">
        <Component {...pageProps} />
        <Footer />
      </div>

      <ToastContainer autoClose={3000} hideProgressBar draggable={false} />
    </Auth0Provider>
  )
}
