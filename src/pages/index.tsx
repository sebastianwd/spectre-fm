/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'

import { Menu } from '~/components/menu'
import { SearchTrigger } from '~/components/search-trigger'
import { useGlobalSearchStore } from '~/store/use-global-search'

const Home: NextPage = () => {
  const { setIsOpen } = useGlobalSearchStore()

  return (
    <>
      <div className="relative flex w-full flex-grow flex-col flex-wrap py-4 md:flex-row md:flex-nowrap">
        <div className="md:w-[140px]"></div>
        <Menu />
        <main role="main" className="w-full flex-grow">
          <div className="container mx-auto flex h-full flex-col px-6 md:px-8">
            <h1 className="mb-4 mt-8 text-3xl md:text-4xl lg:mt-28" id="home">
              Discover new music <br /> or listen to your favorite artists!
            </h1>
            <h2 className="text-lg text-zinc-400">
              Enjoy unlimited free music, find similar artists, full albums,
              lyrics and much more!
            </h2>
            <SearchTrigger
              className="mt-8 h-12 py-7 px-5 md:w-1/2"
              onClick={() => setIsOpen(true)}
            />
            <img
              src="/landing-logo.svg"
              className="ml-auto mr-5 mt-10 h-2/5 lg:mt-0"
              alt="Landing logo"
            />
          </div>
        </main>
      </div>
      <div className="h-24" />
      <footer className="fixed bottom-0 mt-auto h-24 w-full bg-dark-800">
        <div className="mx-auto p-5 text-white">
          <h1 className="text-2xl">Footer</h1>
          <div className="flex">a</div>
        </div>
      </footer>
    </>
  )
}

export default Home
