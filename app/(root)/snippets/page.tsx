import { allMiscs } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@/components/mdx/MDXComponents'
import { notFound } from 'next/navigation'
import { PageLayout } from '@/components/layouts/PageLayout'
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
    <PageLayout
      title={post.title}
      description={post.summary}
      className="prose max-w-none dark:prose-invert"
    >
      <Mdx content={post} MDXComponents={MDXComponents} />
    </PageLayout>
  )
}
