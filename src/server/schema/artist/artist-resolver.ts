import { Arg, Int, Query, Resolver } from 'type-graphql'

import { audioDB } from '~/server/modules/audiodb/audiodb'
import { lastFM } from '~/server/modules/lastfm/lastfm'

import Song from '../song/song'
import Artist from './artist'

@Resolver(Artist)
export class ArtistResolver {
  @Query(() => Artist)
  async artist(
    @Arg('name') name: string
  ): Promise<Partial<Artist> | undefined> {
    const getArtist = async (): Promise<Partial<Artist> | undefined> => {
      const getArtistResponse = await audioDB.getArtist({ artist: name })

      const artist = getArtistResponse.data?.artists?.[0]

      if (artist) {
        return {
          name: artist.strArtist,
          formedYear: artist.intFormedYear?.toString(),
          image: artist.strArtistThumb,
          bannerImage: artist.strArtistFanart,
          logo: artist.strArtistLogo,
          style: artist.strStyle,
          genre: artist.strGenre,
          website: artist.strWebsite,
          facebook: artist.strFacebook,
          twitter: artist.strTwitter,
          biography: artist.strBiographyEN,
          memberQuantity: Number(artist.intMembers),
          location: artist.strCountry,
          disbanded: artist.strDisbanded
            ? Boolean(artist.strDisbanded)
            : undefined,
          disbandedYear: artist.intDiedYear?.toString(),
        }
      }

      const getFallbackArtistResponse = await lastFM.getArtist({ artist: name })

      const fallbackArtist = getFallbackArtistResponse.data?.artist

      if (!fallbackArtist) {
        return undefined
      }

      return {
        name: fallbackArtist.name,
        biography: fallbackArtist.bio.summary,
        genre: fallbackArtist.tags.tag?.map((tag) => tag.name).join(', '),
      }
    }

    const artist = await getArtist()

    if (!artist) {
      throw new Error('Artist not found')
    }

    return artist
  }

  @Query(() => [Song])
  async topsongsByArtist(
    @Arg('artist') artist: string,
    @Arg('limit', () => Int, { defaultValue: 20 }) limit: number,
    @Arg('page', () => Int, { nullable: true }) page?: number
  ): Promise<Partial<Song>[]> {
    const { data } = await lastFM.getArtistSongs({
      artist,
      limit,
      page,
    })

    const tracks = data.toptracks?.track

    if (!tracks) {
      throw new Error(`Tracks for  not found for artist ${artist}`)
    }

    return tracks?.map((track) => ({
      artist: track.artist.name,
      title: track.name,
    }))
  }

  @Query(() => [String])
  async searchArtists(
    @Arg('artist') artist: string,
    @Arg('limit', () => Int, { defaultValue: 10 }) limit: number
  ): Promise<string[]> {
    const searchArtistResponse = await lastFM.searchArtist({ artist, limit })

    const artists = searchArtistResponse.data.results?.artistmatches?.artist

    return artists?.map((artist) => artist.name) || []
  }

  @Query(() => [Artist])
  async similarArtists(
    @Arg('artist') artist: string,
    @Arg('limit', () => Int, { defaultValue: 8 }) limit: number,
    @Arg('onlyNames', { defaultValue: true }) onlyNames?: boolean
  ): Promise<Partial<Artist>[]> {
    const getSimilarArtistsResponse = await lastFM.getSimilarArtists({
      artist,
      limit,
    })

    const similarArtistsBase =
      getSimilarArtistsResponse.data?.similarartists?.artist || []

    const similarArtistsNames = similarArtistsBase.map((artist) => ({
      name: artist.name,
    }))

    if (onlyNames) {
      return similarArtistsNames
    }

    const similarArtists = await Promise.all(
      similarArtistsNames.map(async (similarArtistName) => {
        const getArtistResponse = await audioDB.getArtist({
          artist: similarArtistName.name,
        })

        const similarArtist = getArtistResponse.data?.artists?.[0]

        return similarArtist
          ? {
              name: similarArtist.strArtist,
              formedYear: similarArtist.intFormedYear?.toString(),
              image: similarArtist.strArtistThumb,
              bannerImage: similarArtist.strArtistFanart,
              logo: similarArtist.strArtistLogo,
              style: similarArtist.strStyle,
              genre: similarArtist.strGenre,
              website: similarArtist.strWebsite,
              facebook: similarArtist.strFacebook,
              twitter: similarArtist.strTwitter,
              biography: similarArtist.strBiographyEN,
              memberQuantity: Number(similarArtist.intMembers),
              location: similarArtist.strCountry,
              disbanded: similarArtist.strDisbanded
                ? Boolean(similarArtist.strDisbanded)
                : undefined,
              disbandedYear: similarArtist.intDiedYear?.toString(),
            }
          : similarArtistName
      })
    )

    return similarArtists
  }
}
