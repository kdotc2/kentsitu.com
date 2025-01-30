import { allWritings } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@/components/mdx/MDXComponents'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () =>
  allWritings
    .filter((post) => !post.draft) // Exclude drafts
    .map((post) => ({ slug: post.slug }))

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = allWritings.find((post) => post.slug === slug)

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

export default async function WritingLayout({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = allWritings.find((post) => post.slug === slug)

  console.log(post)

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
