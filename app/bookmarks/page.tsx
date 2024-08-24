/* eslint-disable @next/next/no-img-element */
import LayoutHeader from '@components/LayoutHeader'
import { Metadata } from 'next'
import { allMiscs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { MDXComponents, Mdx } from '@components/Mdx/MDXComponents'

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
      <div className="pb-16 pt-10">
        <LayoutHeader title={metainfo.title} description={metainfo.description} />
        <div className="-mx-6">
          <Mdx content={post} MDXComponents={MDXComponents} />
        </div>
      </div>
    </>
  )
}
