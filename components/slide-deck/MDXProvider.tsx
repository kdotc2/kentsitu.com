'use client'

import { MDXProvider } from '@mdx-js/react'
import { ComponentType, ReactNode } from 'react'
import SlidePage from '@/layouts/SlidePage'
import Cover from './Cover'
import SpeakerNotes from './SpeakerNotes'
import Step from './Step'
import Steps from './Steps'

interface MDXComponents {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ComponentType<any>
}

const components: MDXComponents = {
  SlidePage,
  Cover,
  SpeakerNotes,
  Step,
  Steps,
}

export function MDXProviderWrapper({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
