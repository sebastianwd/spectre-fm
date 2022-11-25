import { GraphQLClient } from 'graphql-request'
import { QueryClient } from 'react-query'

import { getSdk } from '~/generated/graphql'

const gqlClient = new GraphQLClient(`/api/graphql`)

export const { artistQuery, searchArtistQuery } = getSdk(gqlClient)

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: false,
    },
  },
})
