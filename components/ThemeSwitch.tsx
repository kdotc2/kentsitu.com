import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      aria-label="Toggle Appearance"
      type="button"
      className="mx-5 rounded-md px-3 py-[6px] sm:w-[calc(100vw-48px)] sm:hover:bg-gray-200 sm:dark:hover:bg-gray-700 md:w-[140px] lg:w-[200px]"
      onClick={() =>
        setTheme(
          theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark'
        )
      }
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <span className="flex items-center gap-[10px] text-[13px]">
          <SunIcon className="h-4 w-4" /> <span>Light</span>
        </span>
      ) : (
        <span className="flex items-center gap-[10px] text-[13px]">
          <MoonIcon className="h-4 w-4" /> <span>Dark</span>
        </span>
      )}
    </button>
  )
}

export default ThemeSwitch
