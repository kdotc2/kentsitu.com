import '@/css/tailwind.css'
import '@/css/prose.css'
import '@/css/prism.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeProvider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Suspense } from 'react'
import { Loader } from '@/components/ui/skeleton'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kentsitu.com'),
  description:
    'Product Designer. Crafting product experiences through design and code.',
  title: {
    default: 'Kent Situ',
    template: '%s',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {/* Wrap the client-side providers in Suspense */}
          <Suspense
            fallback={
              <div className="h-screen flex items-center justify-center w-full">
                <Loader />
              </div>
            }
          >
            <SidebarProvider>{children}</SidebarProvider>
            <Toaster />
          </Suspense>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
