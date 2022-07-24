import '../styles/global.css'

import { debounce } from 'lodash'
import type { AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { searchArtistQuery } from '~/api'
import { CommandPalette } from '~/components/command-palette'
import AppProvider from '~/providers/app-provider'
import { useGlobalSearchStore } from '~/store/use-global-search'

const MyApp: AppType = (props) => {
  const { Component, pageProps } = props

  const { isOpen, setIsOpen, search, setSearch, setResults, results } =
    useGlobalSearchStore()

  const router = useRouter()

  const [isSearching, setIsSearching] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedSearch = useCallback(
    debounce(async (value: string) => {
      if (value.length < 3) {
        setResults([])
        return
      }

      setIsSearching(true)

      const searchArtistQueryResponse = await searchArtistQuery({
        artist: value,
      })

      setResults(searchArtistQueryResponse.searchArtists)
      setIsSearching(false)
    }, 300),
    []
  )

  useEffect(() => {
    if (search) {
      delayedSearch(search)
    }
  }, [delayedSearch, search])

  return (
    <AppProvider pageProps={pageProps}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
      {isOpen && (
        <CommandPalette
          onSelect={(value) => {
            setIsOpen(false)
            router.push(`/artist/${value}`)
          }}
          commands={results}
          value={search}
          isLoading={isSearching}
          onInputChange={(value) => setSearch(value)}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </AppProvider>
  )
}

export default MyApp
