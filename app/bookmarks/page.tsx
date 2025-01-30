import { LayoutHeader } from '@/components/Layout'
import { Metadata } from 'next'
import { allMiscs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { MDXComponents, Mdx } from '@/components/mdx/MDXComponents'

const metainfo = {
  title: 'Bookmarks',
  description: 'A space to save inspiring portfolios and useful links.',
}

export const metadata: Metadata = {
  title: metainfo.title,
  description: metainfo.description,
}

export default async function BookmarksLayout() {
  const post = allMiscs.find((post) => post.slug === 'bookmarks')

  if (!post) {
    notFound()
  }

  return (
    <>
      <div className="">
        <LayoutHeader
          title={metainfo.title}
          description={metainfo.description}
        />
        <div className="-mx-6">
          <Mdx content={post} MDXComponents={MDXComponents} />
        </div>
      </div>
    </>
  )
}
