'use client'

import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/useMounted' // Import the custom hook
import { SidebarMenuButton } from '@/components/ui/sidebar'

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
      {/* Buttons */}
      <div className="button-container flex group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:gap-1">
        <SidebarMenuButton
          size="icon"
          onClick={() => handleThemeChange('light')}
          className={
            !mounted
              ? ''
              : theme === 'light'
              ? 'bg-sidebar-accent hover:text-current'
              : ''
          }
          showTooltip
        >
          <Sun />
        </SidebarMenuButton>
        <SidebarMenuButton
          size="icon"
          onClick={() => handleThemeChange('dark')}
          className={
            !mounted
              ? ''
              : theme === 'dark'
              ? 'bg-sidebar-accent hover:text-current'
              : ''
          }
          showTooltip
        >
          <Moon />
        </SidebarMenuButton>
        <SidebarMenuButton
          size="icon"
          onClick={() => handleThemeChange('system')}
          className={
            !mounted
              ? ''
              : theme === 'system'
              ? 'bg-sidebar-accent hover:text-current'
              : ''
          }
          showTooltip
        >
          <Monitor />
        </SidebarMenuButton>
      </div>
    </div>
  )
}
