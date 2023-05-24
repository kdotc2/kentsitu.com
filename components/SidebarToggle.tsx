import { useState } from 'react'

const SidebarToggle = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true)
  return (
    <button
      onClick={() => setSidebarToggle(!sidebarToggle)}
      className="mx-2 flex transform justify-center rounded-md px-3 py-[6px] transition-[left,top] duration-300 ease-in-out sm:mx-10 sm:hover:bg-gray-200 sm:dark:hover:bg-gray-700"
    >
      Test
    </button>
  )
}

export default SidebarToggle
