import { allWorks } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@/components/mdx/MDXComponents'
import { getTableOfContents } from '@/lib/toc'
import { notFound } from 'next/navigation'
import { TableOfContents } from '@/components/mdx/Toc'

export const generateStaticParams = async () =>
  allWorks
    .filter((post) => !post.draft) // Exclude drafts
    .map((post) => ({ slug: post.slug }))

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = allWorks.find((post) => post.slug === slug)

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

export default async function WorkLayout({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = allWorks.find((post) => post.slug === slug)

  if (!post || post.draft) {
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
