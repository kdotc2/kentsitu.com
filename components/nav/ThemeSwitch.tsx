'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Monitor, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/useMounted' // Import the custom hook
import { useIsMobile } from '@/hooks/use-mobile'

export const ThemeSwitch = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  const isMobile = useIsMobile()

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    if (theme !== newTheme) {
      setTheme(newTheme)
    }
  }

  return (
    <div
      className={cn(
        'flex items-center rounded-full w-fit',
        'group-data-[state=expanded]:p-1 group-data-[state=expanded]:border',
        isMobile && 'p-1 border',
        className
      )}
    >
      <div className="sidebar-menu-button">
        {/* Buttons */}
        <div className="button-container flex group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:gap-1">
          <Button
            size="icon"
            variant="transparent"
            aria-label="Toggle Dark Mode"
            className={`rounded-full p-2 transition-none  ${
              !mounted
                ? ''
                : theme === 'dark'
                ? 'bg-sidebar-accent hover:text-current'
                : ''
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            <Moon />
          </Button>
          <Button
            size="icon"
            variant="transparent"
            aria-label="Toggle Light Mode"
            className={`rounded-full p-2 transition-none  ${
              !mounted
                ? ''
                : theme === 'light'
                ? 'bg-sidebar-accent hover:text-current'
                : ''
            }`}
            onClick={() => handleThemeChange('light')}
          >
            <Sun />
          </Button>
          <Button
            size="icon"
            variant="transparent"
            aria-label="Toggle System Mode"
            className={`rounded-full p-2 transition-none  ${
              !mounted
                ? ''
                : theme === 'system'
                ? 'bg-sidebar-accent hover:text-current'
                : ''
            }`}
            onClick={() => handleThemeChange('system')}
          >
            <Monitor />
          </Button>
        </div>
      </div>
    </div>
  )
}
