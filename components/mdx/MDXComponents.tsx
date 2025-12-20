import React from 'react'
// 1. Use hook from MDXContent component
import { MDXContent } from '@content-collections/mdx/react'
// 2. Import types from the new generated location
import type { Writing, Work, Project } from 'content-collections'
import Image from './Image'
import Pre from './Pre'
import VideoPlayer from './VideoPlayer'
import Link from 'next/link'
import { MetricsList } from '@/components/mdx/MetricsList'
import { cn } from '@/lib/utils'

// Types for the supported collections
type ContentType = Writing | Work | Project

interface MDXLayoutProps {
  content: ContentType
  [key: string]: unknown
}

const headerClass = (Component: React.ElementType) => {
  const WrappedComponent = ({ className, ...props }: { className: string }) => (
    <Component className={cn('scroll-mt-7', className)} {...props} />
  )
  WrappedComponent.displayName = `Header(${Component})`
  return WrappedComponent
}

// Your component mapping stays exactly the same
export const MDXComponents = {
  h1: headerClass('h1'),
  h2: headerClass('h2'),
  h3: headerClass('h3'),
  h4: headerClass('h4'),
  h5: headerClass('h5'),
  h6: headerClass('h6'),
  Image,
  pre: Pre,
  VideoPlayer,
  Link,
  MetricsList,
}

export const Mdx = ({ content, ...rest }: MDXLayoutProps) => {
  // 3. Content Collections uses the 'mdx' property we defined in the transform function
  // instead of 'body.code'.
  return <MDXContent code={content.mdx} components={MDXComponents} {...rest} />
}
