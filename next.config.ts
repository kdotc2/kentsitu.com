import createMDX from '@next/mdx'
import { withContentlayer } from 'next-contentlayer2'
import type { NextConfig } from 'next'

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' * blob: data:;
  media-src 'self';
  connect-src * vitals.vercel-insights.com;
  font-src 'self';
  frame-src `

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
]

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

// Combine both withMDX and withContentlayer
export default withContentlayer(withMDX(nextConfig))
