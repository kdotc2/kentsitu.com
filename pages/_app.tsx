import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import AllAnalytics from '@/components/analytics'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <AllAnalytics />
      <NavBar />
      <div className="mx-auto flex max-w-5xl flex-col justify-between xl:px-0">
        <Component {...pageProps} />
      </div>
      <Footer />
    </ThemeProvider>
  )
}
