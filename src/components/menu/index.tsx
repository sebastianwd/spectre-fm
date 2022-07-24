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
        <a className="block truncate md:w-full md:px-8 md:py-3">
          <span className="flex md:flex-col md:items-center">
            {React.cloneElement(icon, {
              className: `${'w-7 md:mx-2 mx-4 inline'} ${icon.props.className}`,
            })}
            <span
              className={`hidden text-sm font-medium text-gray-200 group-hover:text-gray-100 md:inline`}
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
      <div className="sticky top-0 h-full w-full px-4 md:fixed md:w-[140px] md:px-0 md:pb-24">
        <div className="sticky top-0 flex h-full flex-grow justify-center rounded-[40px] bg-dark-600 p-4 md:px-0">
          <ul className="flex overflow-hidden md:flex-col md:py-10 md:[&>*]:mb-4">
            <MenuItem
              href="/"
              icon={<HomeIcon className="fill-zinc-200 stroke-zinc-200" />}
            >
              Home
            </MenuItem>
            <MenuItem
              href="/me/playlists"
              icon={<HomeIcon className="fill-zinc-200 stroke-zinc-200" />}
            >
              Playlists
            </MenuItem>
          </ul>
        </div>
      </div>
    </>
  )
}
