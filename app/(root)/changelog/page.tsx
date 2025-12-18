import { allMiscs } from 'content-collections'
import { MDXComponents, Mdx } from '@/components/mdx/MDXComponents'
import { notFound } from 'next/navigation'
import { PageLayout } from '@/components/layouts/PageLayout'
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
    <PageLayout
      title={post.title}
      description={post.summary}
      className="prose max-w-none dark:prose-invert"
    >
      <Mdx content={post} MDXComponents={MDXComponents} />
    </PageLayout>
  )
}
