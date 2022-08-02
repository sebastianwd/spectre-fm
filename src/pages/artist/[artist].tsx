import type { NextPage } from 'next'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { dehydrate, useQuery } from 'react-query'

import { artistQuery, queryClient } from '~/api'

const ArtistPage: NextPage = () => {
  const router = useRouter()

  const { artist } = router.query

  console.log('artist', artist)

  const { data } = useQuery(
    ['artist'],
    () => artistQuery({ name: String(artist) }),
    {
      enabled: !!artist,
    }
  )

  console.log('data?.artist', data?.artist)

  return (
    <div className="container mx-auto w-full max-w-[1920px]">
      <div className="grid lg:grid-cols-3">
        <header
          className="bg-gradient-blend relative col-span-2 flex h-80 w-auto flex-col bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${data?.artist.bannerImage}")` }}
        >
          <div className="z-10 mt-28 flex w-full align-bottom">
            <Image
              src={data?.artist.image}
              layout="fill"
              className="h-8 w-16"
            />
            <h1 className="text-5xl">{data?.artist.name}</h1>
          </div>
        </header>
        <div>a</div>
      </div>
    </div>
  )
}

ArtistPage.getInitialProps = async ({ query }) => {
  console.log('query.artist', query.artist)
  if (!query.artist) {
    return {
      props: {},
    }
  }

  await queryClient.prefetchQuery(['artist'], () =>
    artistQuery({ name: String(query.artist) })
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default ArtistPage
