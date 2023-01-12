/* eslint-disable @typescript-eslint/no-explicit-any */
import GA from './GoogleAnalytics'
import siteMetadata from '@/data/siteMetadata'
import { Analytics } from '@vercel/analytics/react'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    plausible?: (...args: any[]) => void
    sa_event?: (...args: any[]) => void
  }
}

const isProduction = process.env.NODE_ENV === 'production'

const AllAnalytics = () => {
  return (
    <>
      {isProduction && <Analytics />}
      {isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}
    </>
  )
}

export default AllAnalytics
