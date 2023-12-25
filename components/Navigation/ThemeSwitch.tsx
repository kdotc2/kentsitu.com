import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

type Props = {
  onToggleNav?: () => void | undefined
}

const ThemeSwitch = ({ onToggleNav }: Props) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="mx-5 w-[calc(100vw-48px)] rounded-md px-3 py-[6px] active:bg-gray-200 sm:hover:bg-gray-200 md:w-[140px] lg:w-[200px] dark:active:bg-gray-700 sm:hover:dark:bg-gray-800"
      onClick={() => {
        onToggleNav && onToggleNav()
        setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <span className="flex items-center gap-[10px] text-[13px]">
          <SunIcon className="h-4 w-4" aria-hidden="true" /> <span>Light</span>
        </span>
      ) : (
        <span className="flex items-center gap-[10px] text-[13px]">
          <MoonIcon className="h-4 w-4" aria-hidden="true" /> <span>Dark</span>
        </span>
      )}
    </button>
  )
}

export default ThemeSwitch
