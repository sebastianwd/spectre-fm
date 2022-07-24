import { Combobox, Dialog } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import React from 'react'

export const CommandPalette = ({ commands }) => {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      className="fixed inset-0 overflow-y-auto p-4 pt-[15vh]"
    >
      <Dialog.Overlay className="fixed inset-0 bg-dark-600/75" />
      <Combobox
        as="div"
        className="relative mx-auto max-w-xl rounded-xl bg-dark-400 shadow-2xl ring-1 ring-black/5 flex items-center px-4"
        onChange={(command) => {
          // we have access to the selected command
          // a redirect can happen here or any action can be executed
          setIsOpen(false)
        }}
      >
        <Combobox.Input
          className=" w-full border-0 text-md bg-transparent  text-gray-800  focus:ring-0 outline-none py-4"
          placeholder="Search..."
        />
        <SearchIcon className="h-6 w-6 text-slate-300" />
      </Combobox>
    </Dialog>
  )
}
