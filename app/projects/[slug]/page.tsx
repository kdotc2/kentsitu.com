import { allProjects } from 'contentlayer/generated'
import { Mdx, MDXComponents } from '@/components/mdx/MDXComponents'
import { TableOfContents } from '@/components/mdx/Toc'
import { getTableOfContents } from '@/lib/toc'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

export const generateStaticParams = async () =>
  allProjects
    .filter((post) => !post.draft) // Exclude drafts
    .map((post) => ({ slug: post.slug }))

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = allProjects.find((post) => post.slug === slug)

  if (!post || post.draft) {
    return
  }

  const { title, summary: description, image } = post

  return {
    title,
    description,
    openGraph: {
      images: {
        url: image,
      },
    },
  }
}

export default async function ProjectLayout({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = allProjects.find((post) => post.slug === slug)

  if (!post || post.draft) {
    notFound()
  }

  const toc = await getTableOfContents(post.body.raw)

  return (
    <div className="relative flex">
      <div>
        <div className="space-y-2 pb-10 pt-4">
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
        <div className="sticky top-10 flex">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </div>
  )
}
