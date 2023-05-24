/* eslint-disable @typescript-eslint/no-explicit-any */
import GA, { googleAnalyticsId } from './GoogleAnalytics'
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
      {isProduction && googleAnalyticsId && <GA />}
    </>
  )
}

export default AllAnalytics
