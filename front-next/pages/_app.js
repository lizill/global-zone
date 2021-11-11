import React from 'react';
import '../styles/globals.scss';
import Head from 'next/head';

import wrapper from '../store/configuresStore';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>영진 글로벌존</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App);