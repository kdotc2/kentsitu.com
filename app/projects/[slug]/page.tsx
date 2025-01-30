import { allProjects, Projects } from 'contentlayer/generated'
import {
  getContentBySlug,
  generateStaticParamsForContent,
  generateMetadataForContent,
} from '@/lib/utils/contentUtils'
import { Mdx, MDXComponents } from '@/components/mdx/MDXComponents'
import { TableOfContents } from '@/components/mdx/Toc'
import { getTableOfContents } from '@/lib/toc'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

export const generateStaticParams = async () =>
  generateStaticParamsForContent(allProjects)

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  return await generateMetadataForContent({
    params,
    allContent: allProjects,
    basePath: '/projects',
  })
}

// Main layout for the project page
export default async function ProjectLayout({
  params,
}: {
  params: { slug: string }
}) {
  // `params` is a promise, so we must await it
  const resolvedParams = await params // Make sure to await `params`
  const projectPost = getContentBySlug(resolvedParams.slug, allProjects)

  const post = projectPost as Projects

  // Handle the case where the post is not found
  if (!post) {
    notFound()
  }

  const toc = await getTableOfContents(post.body.raw)

  return (
    <div className="relative flex">
      <div>
        <div className="space-y-2 pb-10">
          {
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={post.url}
              className="inline-block"
            >
              <span className="flex items-center gap-2 text-2xl font-bold">
                {post.title}
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </a>
          }
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
