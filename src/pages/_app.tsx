import { type AppType } from 'next/app'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import Head from 'next/head'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Altura Test</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default api.withTRPC(MyApp)
