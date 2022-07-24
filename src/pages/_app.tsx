import '../styles/global.css'

import type { AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'

import { CommandPalette } from '~/components/command-palette'
import AppProvider from '~/providers/app-provider'

const MyApp: AppType = (props) => {
  const { Component, pageProps } = props

  return (
    <AppProvider pageProps={pageProps}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
      <CommandPalette commands={[]} />
    </AppProvider>
  )
}

export default MyApp
