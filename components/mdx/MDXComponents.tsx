'use client'

import React from 'react'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { coreContent } from 'lib/utils/contentlayer'
import type { Writing, Work, Misc, Projects } from 'contentlayer/generated'
import Image from './Image'
import Pre from './Pre'
import VideoPlayer from './VideoPlayer'
import Bookmarks from '@/components/layouts/BookmarksLayout'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface MDXLayout {
  content: Writing | Work | Misc | Projects
  [key: string]: unknown
}

const headerClass = (Component: React.ElementType) => {
  const WrappedComponent = ({ className, ...props }: { className: string }) => (
    <Component className={cn('scroll-mt-7', className)} {...props} />
  )

  WrappedComponent.displayName = `Header(${Component})` // Add a display name

  return WrappedComponent
}

export const MDXComponents: object = {
  h1: headerClass('h1'),
  h2: headerClass('h2'),
  h3: headerClass('h3'),
  h4: headerClass('h4'),
  h5: headerClass('h5'),
  h6: headerClass('h6'),
  Image,
  pre: Pre,
  VideoPlayer,
  Bookmarks,
  Link,
}

export const Mdx = ({ content, ...rest }: MDXLayout) => {
  const MDXLayout = useMDXComponent(content.body.code)
  const mainContent = coreContent(content)

  return (
    <MDXLayout
      content={mainContent}
      components={{ ...MDXComponents }}
      {...rest}
    />
  )
}
