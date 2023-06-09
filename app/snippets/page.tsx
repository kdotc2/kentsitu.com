import { allMiscs } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@components/Mdx/MDXComponents'
import { notFound } from 'next/navigation'
import LayoutHeader from '@components/LayoutHeader'
import { Metadata } from 'next'
import { TableOfContents } from '@components/Mdx/Toc'
import { getTableOfContents } from '@lib/remark-toc-headings'

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

  const toc = await getTableOfContents(post.body.raw)

  return (
    <>
      <div className="relative pb-16 pt-10 xl:grid xl:grid-cols-[1fr_240px] xl:gap-10 2xl:gap-20">
        <div>
          <LayoutHeader title={post.title} description={post.summary} />
          <div className="prose max-w-none dark:prose-dark">
            <Mdx content={post} MDXComponents={MDXComponents} />
          </div>
        </div>
        <div className="hidden text-sm xl:block">
          <div className="sticky top-14 max-h-[calc(var(--vh)-4rem)] overflow-y-auto">
            <TableOfContents toc={toc} />
          </div>
        </div>
      </div>
    </>
  )
}
