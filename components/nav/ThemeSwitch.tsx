'use client'

import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/useMounted' // Import the custom hook
import { SidebarMenuButton } from '@/components/ui/sidebar'

interface Theme {
  value: 'light' | 'dark' | 'system'
  icon: React.ReactNode
}

const themes: Theme[] = [
  { value: 'light', icon: <Sun /> },
  { value: 'dark', icon: <Moon /> },
  { value: 'system', icon: <Monitor /> },
]

export const ThemeSwitch = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    if (theme !== newTheme) {
      setTheme(newTheme)
    }
  }

  return (
    <div
      className={cn(
        'flex items-center rounded-full w-fit m-1 p-1 border',
        'group-data-[state=collapsed]:border-none',
        className
      )}
    >
      <div className="button-container flex group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:gap-1">
        {themes.map(({ value, icon }) => (
          <SidebarMenuButton
            aria-label={`Toggle ${value} mode`}
            key={value}
            size="icon"
            onClick={() => handleThemeChange(value)}
            className={
              !mounted
                ? ''
                : theme === value
                ? 'bg-sidebar-accent hover:text-current'
                : ''
            }
            showTooltip
          >
            {icon}
          </SidebarMenuButton>
        ))}
      </div>
    </div>
  )
}
