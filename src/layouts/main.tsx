import { Menu } from '~/components/menu'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative flex w-full flex-grow flex-col flex-wrap py-4 md:flex-row md:flex-nowrap md:py-0">
        <div className="flex-shrink-0 md:w-36"></div>
        <Menu />
        <main role="main" className="w-full flex-grow">
          {children}
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
