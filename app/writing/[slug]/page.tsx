import { allWritings } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@/components/mdx/MDXComponents'
import { notFound } from 'next/navigation'
import {
  generateStaticParamsForContent,
  getContentBySlug,
  getMetadataBySlug,
} from '@/lib/utils/contentUtils'

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

  return (
    <div className="">
      <div className="space-y-2 pb-10">
        <div className="text-2xl font-bold">{post.title}</div>
        <p className="text-gray-500 dark:text-gray-400">{post.summary}</p>
      </div>
      <div className="prose max-w-none dark:prose-invert">
        <Mdx content={post} MDXComponents={MDXComponents} />
      </div>
    </div>
  )
}
