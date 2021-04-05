import './styles.css'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import Footer from '../components/footer'
import { Auth0Provider } from '@auth0/auth0-react'

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      redirectUri={process.browser && window.location.origin}
    >
      <div className="antialiased max-w-xl mx-auto px-4">
        <Component {...pageProps} />
        <Footer />
      </div>
      <ToastContainer />
    </Auth0Provider>
  )
}
