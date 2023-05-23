/* eslint-disable react/display-name */
import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { coreContent } from 'lib/utils/contentlayer'
import type { Writing, Work, Misc, Projects } from 'contentlayer/generated'
import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'
import Button from './Button'
import VideoPlayer from './VideoPlayer'

interface MDXLayout {
  content: Writing | Work | Misc | Projects
  [key: string]: unknown
}

// interface Wrapper {
//   layout: string
//   [key: string]: unknown
// }

// const Wrapper = ({ layout, content, ...rest }: MDXLayout) => {
//   const Layout = require(`../layouts/${layout}`).default
//   return <Layout content={content} {...rest} />
// }

export const MDXComponents: any = {
  Image,
  a: CustomLink,
  pre: Pre,
  Button,
  VideoPlayer,
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
