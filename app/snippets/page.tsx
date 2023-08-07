import { allMiscs } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@components/Mdx/MDXComponents'
import { notFound } from 'next/navigation'
import LayoutHeader from '@components/LayoutHeader'
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
    <>
      <div className="relative pb-16 pt-10">
        <div>
          <LayoutHeader title={post.title} description={post.summary} />
          <div className="prose max-w-none dark:prose-dark">
            <Mdx content={post} MDXComponents={MDXComponents} />
          </div>
        </div>
      </div>
    </>
  )
}
