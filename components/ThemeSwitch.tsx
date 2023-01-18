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
      className="rounded ml-3 sm:mr-0 mr-3"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <div className="text-xl py-2 px-2 sm:hover:rounded sm:hover:bg-gray-200 sm:dark:hover:bg-gray-800">
          <MdWbSunny />
        </div>
      ) : (
        <div className="text-xl py-2 px-2 sm:hover:rounded sm:hover:bg-gray-200 sm:dark:hover:bg-gray-800">
          <MdNightlightRound className="-rotate-45" />
        </div>
      )}
    </button>
  )
}

export default ThemeSwitch
