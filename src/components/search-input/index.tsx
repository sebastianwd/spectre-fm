interface Props {
  className?: string
}

export const SearchInput = (props: Props) => {
  return (
    <div
      className={`relative text-gray-600 focus-within:text-slate-100 lg:w-7/12 mt-7 ${
        props.className ? props.className : ''
      }`}
    >
      <span className="absolute inset-y-0 right-0 flex items-center pr-6">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input
        type="text"
        className="w-full bg-dark-400 text-xl rounded-[24px] py-5 px-6 outline-none"
      />
    </div>
  )
}
