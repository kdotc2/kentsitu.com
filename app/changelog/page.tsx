import { allMiscs } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@/components/mdx/MDXComponents'
import { notFound } from 'next/navigation'
import { LayoutHeader } from '@/components/Layout'
import { Metadata } from 'next'

const metainfo = {
  title: 'Changelog',
  description:
    ' A space to keep track of updates and bug fixes for this website.',
}

export const metadata: Metadata = {
  title: metainfo.title,
  description: metainfo.description,
}

export default async function ChangelogLayout() {
  const post = allMiscs.find((p) => p.slug === 'changelog')
  if (!post) {
    notFound()
  }

  return (
    <>
      <div className="">
        <LayoutHeader title={post.title} description={post.summary} />
        <div className="prose max-w-none dark:prose-invert">
          <Mdx content={post} MDXComponents={MDXComponents} />
        </div>
      </div>
    </>
  )
}
