import type { NextPage } from 'next'

import { Menu } from '~/components/menu'
import { SearchInput } from '~/components/search-input'

const Home: NextPage = () => {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row flex-wrap md:flex-nowrap py-4 flex-grow relative">
        <div className="md:w-[140px]"></div>
        <Menu />
        <main role="main" className="w-full flex-grow">
          <div className="h-full flex px-4 md:px-8 container mx-auto flex-col">
            <h1 className="text-3xl md:text-4xl mb-3 mt-28" id="home">
              Discover new music <br /> or listen to your favorite artists!
            </h1>
            <h2>
              Enjoy unlimited free music, find similar artists, full albums,
              lyrics and much more!
            </h2>
            <SearchInput />
          </div>
        </main>
      </div>
      <footer className="bg-dark-800 mt-auto fixed bottom-0 w-full max-h-24">
        <div className="p-5 text-white mx-auto">
          <h1 className="text-2xl">Footer</h1>
          <div className="flex">a</div>
        </div>
      </footer>
    </>
  )
}

export default Home
