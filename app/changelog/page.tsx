import { allMiscs } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@components/Mdx/MDXComponents'
import { notFound } from 'next/navigation'
import LayoutHeader from '@components/LayoutHeader'
import { Metadata } from 'next'

const metainfo = {
  title: 'Changelog',
  description: 'Updates and bug fixes for this website.',
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
      <div className="py-10">
        <LayoutHeader title={post.title} description={post.summary} />
        <div className="prose max-w-none dark:prose-dark">
          <article>
            <Mdx content={post} MDXComponents={MDXComponents} />
          </article>
        </div>
      </div>
    </>
  )
}
