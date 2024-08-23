import '@css/tailwind.css'
import '@css/prose.css'
import '@css/prism.css'
import '@fontsource-variable/inter'
import MobileNav from '@components/Navigation/MobileNav'
import Providers from './providers'
import Sidebar from '@components/Navigation/Sidebar'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://kentsitu.com'),
  creator: 'Kent Situ',
  description: 'Product Designer. Crafting product experiences through design and code.',
  icons: {
    shortcut: '/static/favicons/favicon-16x16.png',
    icon: '/static/favicons/favicon.ico',
    apple: '/static/favicons/apple-touch-icon.png',
  },
  manifest: '/static/favicons/site.webmanifest',
  openGraph: {
    title: 'Kent Situ',
    description: 'Product Designer. Crafting product experiences through design and code.',
    url: 'https://kentsitu.com',
    siteName: 'Kent Situ',
    images: [
      {
        alt: 'Kent Situ',
        url: '/static/images/og.png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    index: true,
  },
  title: {
    default: 'Kent Situ',
    template: '%s',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kent Situ',
    images: '/static/images/og.png',
    description: 'Product Designer. Crafting product experiences through design and code.',
  },
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    // suppressHydrationWarning={true} to suppress warning for <Providers>
    <html
      lang="en"
      suppressHydrationWarning={true}
      // className="scroll-mt-32 scroll-smooth"
      // className="[--scroll-pt:9.875rem]"
    >
      <body className="flex overscroll-y-none bg-[#f2f2f2] text-gray-900 antialiased dark:bg-[#121212] dark:text-gray-100">
        <Providers>
          <Sidebar />
          <MobileNav />
          <div className="relative min-w-0 flex-auto bg-[#f2f2f2] dark:bg-[#121212]">
            <div className="relative overflow-auto pt-16 sm:rounded-2xl sm:pb-5 sm:pl-5 sm:pr-5 md:pl-0 md:pt-5 lg:py-10 lg:pr-10">
              <div className="relative overflow-y-auto overflow-x-hidden bg-[#fbfbfb] dark:bg-[#050505] sm:rounded-2xl">
                <main className="mx-auto max-w-5xl px-5 supports-[height:100dvh]:h-[calc(100dvh-64px)] sm:h-[calc(100vh-84px)] md:h-[calc(100vh-40px)] md:px-10 lg:h-[calc(100vh-80px)]">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
