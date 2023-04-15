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
      className="ml-3 mr-5 rounded px-1 py-1 text-lg sm:mr-0 sm:px-2 sm:py-2 sm:hover:bg-gray-200 sm:dark:hover:bg-gray-700"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <MdWbSunny />
      ) : (
        <MdNightlightRound className="-rotate-45" />
      )}
    </button>
  )
}

export default ThemeSwitch
