import '@css/tailwind.css'
import '@css/prose.css'
import '@css/prism.css'
// import "/css/tailwind.css"
import '@fontsource/inter/variable-full.css'
import MobileNav from '@components/Navigation/MobileNav'
import Providers from './providers'
import Sidebar from '@components/Navigation/Sidebar'
import AnimateEnter from '@components/AnimateEnter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://kentsitu.com'),
  category: 'Design',
  creator: 'Kent Situ',
  description:
    'Product Designer with experience in mobile app design, user experience, research, and prototyping. Solving problems and bringing conceptual ideas to life.',
  icons: {
    apple: '/static/favicons/apple-touch-icon.png',
    icon: '/static/favicons/favicon-32x32.png',
    shortcut: '/static/favicons/favicon.ico',
  },
  manifest: '/static/favicons/site.webmanifest',
  openGraph: {
    description:
      'Product Designer with experience in mobile app design, user experience, research, and prototyping. Solving problems and bringing conceptual ideas to life.',
    images: [
      {
        alt: 'Kent Situ',
        height: 628,
        url: 'public/static/images/og.png',
        width: 1200,
      },
    ],
    locale: 'en-US',
    siteName: 'Kent Situ',
    title: 'Kent Situ',
    type: 'website',
    url: 'https://kentsitu.com',
  },
  publisher: 'Kent Situ',
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
  themeColor: [
    { color: '#fbfbfb', media: '(prefers-color-scheme: light)' },
    { color: '#111111', media: '(prefers-color-scheme: dark)' },
  ],
  title: {
    default: 'Kent Situ',
    template: '%s',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kent Situ',
    images: 'public/static/images/og.png',
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
      // className="[--scroll-mt:400px]"
    >
      <body className="flex overflow-x-hidden overscroll-y-none bg-gray-100 text-gray-900 antialiased dark:bg-[#212121] dark:text-gray-100">
        <Providers>
          <Sidebar />
          <MobileNav />
          <div className="relative min-w-0 flex-auto bg-gray-100 dark:bg-[#212121]">
            <div className="relative overflow-auto pt-16 sm:rounded-2xl sm:pb-5 sm:pl-5 sm:pr-5 md:pl-0 md:pt-5 lg:py-10 lg:pr-10">
              <div className="relative overflow-y-auto bg-[#fbfbfb] dark:bg-[#111111] sm:rounded-2xl">
                <div className="mx-auto max-w-5xl px-6 supports-[height:100dvh]:h-[calc(100dvh-64px)] sm:h-[calc(100vh-84px)] md:h-[calc(100vh-40px)] md:px-10 lg:h-[calc(100vh-80px)] lg:px-14 xl:max-w-7xl">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
