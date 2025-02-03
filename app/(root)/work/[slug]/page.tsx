import { allWorks } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import {
  generateStaticParamsForContent,
  getContentBySlug,
  getMetadataBySlug,
} from '@/lib/utils/contentUtils'
import { SlugContentLayout } from '@/components/layouts/PageLayout'

export const generateStaticParams = async () =>
  generateStaticParamsForContent(allWorks)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return getMetadataBySlug({
    slug,
    allContent: allWorks,
  })
}

export default async function WorkLayout({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getContentBySlug(slug, allWorks)

  if (!post || post.draft) {
    notFound()
  }

  // const toc = await getTableOfContents(post.body.raw)

  return (
    <div className="relative flex">
      <SlugContentLayout post={post} />
    </div>
  )
}
