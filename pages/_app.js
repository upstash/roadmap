import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { SWRConfig } from 'swr';
import { ToastContainer } from 'react-toastify';
import { Auth0Provider } from '@auth0/auth0-react';
import Head from 'next/head';
import Footer from '../components/footer';
import Header from '../components/header';

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.browser && window.location.origin}
    >
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
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
  );
}
