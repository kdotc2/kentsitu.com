'use client'

import { useIsMobile } from '@/hooks/use-mobile'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()
  const isMobile = useIsMobile()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
      closeButton={!isMobile}
      toastOptions={{
        classNames: {
          closeButton:
            '!left-[unset] !right-3 !top-3 !transform-none !border-none !size-6 !rounded-md [&>svg]:size-4',
        },
      }}
    />
  )
}

export { Toaster }
