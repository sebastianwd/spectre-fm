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
          <div className="z-10 mt-28 flex w-full items-center gap-7 px-8">
            <Image
              alt="artist"
              width={200}
              height={200}
              quality={100}
              src={data?.artist.image || ''}
              className="h-40 w-40 rounded-md object-cover"
            />
            <div>
              <h1 className="text-5xl text-gray-50">{data?.artist.name}</h1>
              <h5 className="text-sm font-thin text-gray-300">
                {data?.artist.genre}
              </h5>
            </div>
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
