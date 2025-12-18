import { allWritings } from 'content-collections'
import { notFound } from 'next/navigation'
import {
  generateStaticParamsForContent,
  getContentBySlug,
  getMetadataBySlug,
} from '@/lib/utils/contentUtils'
import { SlugContentLayout } from '@/components/layouts/PageLayout'

export const generateStaticParams = async () =>
  generateStaticParamsForContent(allWritings)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return getMetadataBySlug({
    slug,
    allContent: allWritings,
  })
}

export default async function WritingLayout({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getContentBySlug(slug, allWritings)

  if (!post || post.draft) {
    notFound()
  }

  return <SlugContentLayout post={post} />
}
