import '@/css/tailwind.css'
import '@/css/prose.css'
import '@/css/prism.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { MDXProviderWrapper } from '@/components/slide-deck/MDXProvider'
import { ModeProvider } from '@/context/ModeContext'
import { CurrentSlideProvider } from '@/context/CurrentSlideContext'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { Header } from '@/components/Header'

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
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <MDXProviderWrapper>
            <CurrentSlideProvider>
              <ModeProvider>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset>
                    <Header />
                    <div className="relative overflow-y-auto">
                      <div className="mx-auto max-w-5xl p-5 supports-[height:100dvh]:h-[calc(100dvh-64px)] md:p-10">
                        {children}
                      </div>
                    </div>
                  </SidebarInset>
                </SidebarProvider>
              </ModeProvider>
            </CurrentSlideProvider>
          </MDXProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
