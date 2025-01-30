'use client'

import dynamic from 'next/dynamic'
import { MDXProviderWrapper } from '@/components/slide-deck/MDXProvider'

// Import MDX content dynamically
const Content = dynamic(() => import('./test.mdx'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function SlidesPage() {
  return (
    <MDXProviderWrapper>
      <Content />
    </MDXProviderWrapper>
  )
}
