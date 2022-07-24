import { useRouter } from 'next/router'

const ArtistPage = () => {
  const router = useRouter()
  const { artist } = router.query

  return <>{artist}</>
}

export default ArtistPage
