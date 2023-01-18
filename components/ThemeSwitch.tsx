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
      className="rounded ml-3 sm:mr-0 mr-3 text-xl sm:hover:rounded sm:hover:bg-gray-200 sm:dark:hover:bg-gray-800 px-2 py-2"
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
