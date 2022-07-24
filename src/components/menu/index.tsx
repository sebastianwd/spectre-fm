import { HomeIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface MenuItemProps {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}

const MenuItem = ({ children, icon, href }: MenuItemProps) => {
  const router = useRouter()

  const active = router.pathname === href

  return (
    <li
      className={`group py-2 hover:bg-dark-700 ${
        active && 'bg-dark-700'
      } rounded-[24px] transition-colors duration-300`}
    >
      <Link href={href}>
        <a className="truncate md:px-8 block md:w-full md:py-3">
          <span className="flex md:flex-col md:items-center">
            {React.cloneElement(icon, {
              className: `${'w-7 md:mx-2 mx-4 inline'} ${icon.props.className}`,
            })}
            <span
              className={`hidden md:inline text-gray-200 group-hover:text-gray-100 text-sm font-medium`}
            >
              {children}
            </span>
          </span>
        </a>
      </Link>
    </li>
  )
}

export const Menu = () => {
  return (
    <>
      <div className="w-full px-4 md:px-0 md:w-[140px] md:fixed sticky top-0 h-full md:pb-24">
        <div className="sticky top-0 p-4 md:px-0 bg-dark-800 rounded-[40px] h-full flex flex-grow justify-center">
          <ul className="flex md:flex-col overflow-hidden md:py-10 md:[&>*]:mb-4">
            <MenuItem
              href="/"
              icon={<HomeIcon className="stroke-zinc-200 fill-zinc-200" />}
            >
              Home
            </MenuItem>
            <MenuItem
              href="/me/playlists"
              icon={<HomeIcon className="stroke-zinc-200 fill-zinc-200" />}
            >
              Playlists
            </MenuItem>
          </ul>
        </div>
      </div>
    </>
  )
}
