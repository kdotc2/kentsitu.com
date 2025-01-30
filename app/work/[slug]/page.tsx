import { allWorks } from 'contentlayer/generated'
import {
  getContentBySlug,
  generateStaticParamsForContent,
  generateMetadataForContent,
} from '@/lib/utils/contentUtils'
import { MDXComponents, Mdx } from '@/components/mdx/MDXComponents'
import { getTableOfContents } from '@/lib/toc'
import { notFound } from 'next/navigation'
import { TableOfContents } from '@/components/mdx/Toc'

export const generateStaticParams = async (): Promise<{ slug: string }[]> =>
  generateStaticParamsForContent(allWorks)

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  return await generateMetadataForContent({
    params,
    allContent: allWorks,
    basePath: '/work',
  })
}

export default async function WorkLayout({
  params,
}: {
  params: { slug: string }
}) {
  const resolvedParams = await params
  const post = getContentBySlug(resolvedParams.slug, allWorks)

  if (!post || post.draft) {
    // Check if the post exists or is a draft
    notFound()
  }

  const toc = await getTableOfContents(post.body.raw)

  return (
    <div className="relative flex">
      <div>
        <div className="space-y-2 pb-10">
          <div className="text-2xl font-bold">{post.title}</div>
          <p className="text-gray-500 dark:text-gray-400">{post.description}</p>
        </div>
        <div className="prose max-w-5xl dark:prose-invert">
          <Mdx content={post} MDXComponents={MDXComponents} />
        </div>
      </div>
      <div className="hidden max-w-[200px] text-sm 2xl:block">
        <div className="sticky top-10 flex">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </div>
  )
}
