'use client'
import siteMetadata from 'content/siteMetadata'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={siteMetadata.theme}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
