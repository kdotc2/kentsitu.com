import { allSlides, Slides } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { getContentBySlug } from '@/lib/utils/contentUtils'
import { SlugContentLayout } from '@/components/layouts/PageLayout'

export default async function SlidesLayout({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getContentBySlug(slug, allSlides) as Slides

  if (!post || post.draft) {
    notFound()
  }

  return <SlugContentLayout post={post} showHeader={false} className="p-0" />
}
