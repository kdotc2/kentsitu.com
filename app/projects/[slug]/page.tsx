import { allProjects, Projects } from 'contentlayer/generated'
import { Mdx, MDXComponents } from '@/components/mdx/MDXComponents'
import { TableOfContents } from '@/components/mdx/Toc'
import { getTableOfContents } from '@/lib/toc'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import {
  generateStaticParamsForContent,
  getContentBySlug,
  getMetadataBySlug,
} from '@/lib/utils/contentUtils'

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
      <div>
        <div className="space-y-2 pb-10">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={post.url}
            className="inline-block"
          >
            <span className="flex items-center gap-2 text-2xl font-bold">
              {post.title}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
          <p className="text-gray-500 dark:text-gray-400">{post.description}</p>
        </div>
        <div className="prose max-w-5xl dark:prose-dark">
          <Mdx content={post} MDXComponents={MDXComponents} />
        </div>
      </div>
      <div className="hidden max-w-[200px] text-sm 2xl:block">
        <div className="fixed top-24 flex">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </div>
  )
}
