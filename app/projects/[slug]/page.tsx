import { allProjects, Projects } from 'contentlayer/generated'
import { getTableOfContents } from '@/lib/toc'
import { notFound } from 'next/navigation'
import {
  generateStaticParamsForContent,
  getContentBySlug,
  getMetadataBySlug,
} from '@/lib/utils/contentUtils'
import { SlugContentLayout } from '@/components/layouts/PageLayout'

export const generateStaticParams = async () =>
  generateStaticParamsForContent(allProjects)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return getMetadataBySlug({
    slug,
    allContent: allProjects,
  })
}

export default async function ProjectLayout({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getContentBySlug(slug, allProjects) as Projects

  if (!post || post.draft) {
    notFound()
  }

  const toc = await getTableOfContents(post.body.raw)

  return (
    <div className="relative flex">
      <SlugContentLayout post={post} toc={toc} titleLink />
    </div>
  )
}
