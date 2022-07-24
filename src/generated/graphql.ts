import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Artist = {
  __typename?: 'Artist'
  bannerImage: Maybe<Scalars['String']>
  biography: Maybe<Scalars['String']>
  disbanded: Maybe<Scalars['Boolean']>
  disbandedYear: Maybe<Scalars['String']>
  facebook: Maybe<Scalars['String']>
  formedYear: Maybe<Scalars['String']>
  genre: Maybe<Scalars['String']>
  image: Maybe<Scalars['String']>
  location: Maybe<Scalars['String']>
  logo: Maybe<Scalars['String']>
  memberQuantity: Maybe<Scalars['Float']>
  name: Scalars['String']
  style: Maybe<Scalars['String']>
  twitter: Maybe<Scalars['String']>
  website: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  artist: Artist
  searchArtists: Array<Scalars['String']>
  similarArtists: Array<Artist>
  topsongsByArtist: Array<Song>
}

export type QueryArtistArgs = {
  name: Scalars['String']
}

export type QuerySearchArtistsArgs = {
  artist: Scalars['String']
  limit?: InputMaybe<Scalars['Int']>
}

export type QuerySimilarArtistsArgs = {
  artist: Scalars['String']
  limit?: InputMaybe<Scalars['Int']>
  onlyNames?: InputMaybe<Scalars['Boolean']>
}

export type QueryTopsongsByArtistArgs = {
  artist: Scalars['String']
  limit?: InputMaybe<Scalars['Int']>
  page: InputMaybe<Scalars['Int']>
}

export type Song = {
  __typename?: 'Song'
  album: Maybe<Scalars['String']>
  artist: Scalars['String']
  duration: Maybe<Scalars['String']>
  genre: Maybe<Scalars['String']>
  playlistId: Maybe<Scalars['Int']>
  title: Scalars['String']
  year: Maybe<Scalars['String']>
}

export type ArtistQueryQueryVariables = Exact<{
  name: Scalars['String']
}>

export type ArtistQueryQuery = {
  __typename?: 'Query'
  artist: {
    __typename?: 'Artist'
    name: string
    biography: string | null
    bannerImage: string | null
    genre: string | null
    formedYear: string | null
    style: string | null
    logo: string | null
  }
}

export type SearchArtistQueryQueryVariables = Exact<{
  artist: Scalars['String']
}>

export type SearchArtistQueryQuery = {
  __typename?: 'Query'
  searchArtists: Array<string>
}

export const ArtistQueryDocument = gql`
  query artistQuery($name: String!) {
    artist(name: $name) {
      name
      biography
      bannerImage
      genre
      formedYear
      style
      logo
    }
  }
`
export const SearchArtistQueryDocument = gql`
  query searchArtistQuery($artist: String!) {
    searchArtists(artist: $artist)
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    artistQuery(
      variables: ArtistQueryQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ArtistQueryQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ArtistQueryQuery>(ArtistQueryDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'artistQuery',
        'query'
      )
    },
    searchArtistQuery(
      variables: SearchArtistQueryQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<SearchArtistQueryQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SearchArtistQueryQuery>(
            SearchArtistQueryDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'searchArtistQuery',
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
