import { allWritings } from 'contentlayer/generated'
import {
  getContentBySlug,
  generateStaticParamsForContent,
  generateMetadataForContent,
} from '@/lib/utils/contentUtils'
import { MDXComponents, Mdx } from '@/components/mdx/MDXComponents'
import { notFound } from 'next/navigation'

export const generateStaticParams = async (): Promise<{ slug: string }[]> =>
  generateStaticParamsForContent(allWritings)

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  return await generateMetadataForContent({
    params,
    allContent: allWritings,
    basePath: '/writing',
  })
}

export default async function WritingLayout({
  params,
}: {
  params: { slug: string }
}) {
  const resolvedParams = await params
  const post = getContentBySlug(resolvedParams.slug, allWritings)

  if (!post) {
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
