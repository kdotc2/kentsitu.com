import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MdWbSunny, MdNightlightRound } from 'react-icons/md'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="rounded py-2 pl-3 sm:pr-0 pr-3"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <div className="text-xl py-2 px-2 sm:hover:rounded sm:hover:py-2 sm:hover:px-2 sm:hover:bg-gray-200 sm:dark:hover:bg-gray-800">
          <MdWbSunny />
        </div>
      ) : (
        <div className="text-xl py-2 px-2 sm:hover:rounded sm:hover:py-2 sm:hover:px-2 sm:hover:bg-gray-200 sm:dark:hover:bg-gray-800">
          <MdNightlightRound className="-rotate-45" />
        </div>
      )}
    </button>
  )
}

export default ThemeSwitch
