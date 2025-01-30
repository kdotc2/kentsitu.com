'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Monitor, Moon, Sun } from 'lucide-react'
import { Flex } from '@/components/ui/flex'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/useMounted' // Import the custom hook
import { useIsMobile } from '@/hooks/use-mobile'

export const ThemeSwitch = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted() // Use the custom hook to track mounted state
  const isMobile = useIsMobile()

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    if (theme !== newTheme) {
      setTheme(newTheme)
    }
  }

  return (
    <Flex
      className={cn(
        'flex items-center rounded-full w-fit',
        'group-data-[state=expanded]:p-1 group-data-[state=expanded]:border group-data-[state=collapsed]:mx-2',
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
            className={`rounded-full p-2 transition-none text-gray-500 dark:text-gray-400 ${
              !mounted
                ? ''
                : theme === 'dark'
                ? 'bg-gray-100 hover:text-current dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            <Moon />
          </Button>
          <Button
            size="icon"
            variant="transparent"
            aria-label="Toggle Light Mode"
            className={`rounded-full p-2 transition-none text-gray-500 dark:text-gray-400 ${
              !mounted
                ? ''
                : theme === 'light'
                ? 'bg-gray-100 hover:text-current dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => handleThemeChange('light')}
          >
            <Sun />
          </Button>
          <Button
            size="icon"
            variant="transparent"
            aria-label="Toggle System Mode"
            className={`rounded-full p-2 transition-none text-gray-500 dark:text-gray-400 ${
              !mounted
                ? ''
                : theme === 'system'
                ? 'bg-gray-100 hover:text-current dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => handleThemeChange('system')}
          >
            <Monitor />
          </Button>
        </div>
      </div>
    </Flex>
  )
}
