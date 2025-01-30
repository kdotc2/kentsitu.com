import { allMiscs } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@/components/mdx/MDXComponents'
import { notFound } from 'next/navigation'
import { LayoutHeader } from '@/components/Layout'
import { Metadata } from 'next'

const metainfo = {
  title: 'Snippets',
  description: 'Collection of reusable code.',
}

export const metadata: Metadata = {
  title: metainfo.title,
  description: metainfo.description,
}

export default async function SnippetsLayout() {
  const post = allMiscs.find((post) => post.slug === 'snippets')

  if (!post) {
    notFound()
  }

  return (
    <div className="relative">
      <div>
        <LayoutHeader title={post.title} description={post.summary} />
        <div className="prose max-w-full dark:prose-invert">
          <Mdx content={post} MDXComponents={MDXComponents} />
        </div>
      </div>
    </div>
  )
}
