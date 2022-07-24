import * as React from 'react'
import { Hydrate, QueryClientProvider } from 'react-query'

import { queryClient } from '~/api'

const AppProvider = (props: { children: React.ReactNode; pageProps: any }) => {
  const { children, pageProps } = props

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  )
}

export default AppProvider
