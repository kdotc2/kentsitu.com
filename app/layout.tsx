import '@/css/tailwind.css'
import '@/css/prose.css'
import '@/css/prism.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeProvider'
import { MDXProviderWrapper } from '@/components/slide-deck/MDXProvider'
import { ModeProvider } from '@/context/ModeContext'
import { CurrentSlideProvider } from '@/context/CurrentSlideContext'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/nav/AppSidebar'
import { Header } from '@/components/nav/Header'
import { Suspense } from 'react'

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
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <ThemeProvider>
          <MDXProviderWrapper>
            {/* Wrap the client-side providers in Suspense */}
            <Suspense fallback={<div>Loading...</div>}>
              <CurrentSlideProvider>
                <ModeProvider>
                  <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                      <Header />
                      <div className="relative overflow-y-auto overflow-x-hidden">
                        <div className="mx-auto max-w-5xl px-5 pt-10 md:p-10 md:supports-[height:100dvh]:h-[calc(100dvh-64px)]">
                          {children}
                        </div>
                      </div>
                    </SidebarInset>
                  </SidebarProvider>
                </ModeProvider>
              </CurrentSlideProvider>
            </Suspense>
          </MDXProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
