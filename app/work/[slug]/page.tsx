import { Work, allWorks } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@components/Mdx/MDXComponents'
import { TableOfContents } from '@components/Mdx/Toc'
import { getTableOfContents } from '@lib/remark-toc-headings'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => allWorks.map((post) => ({ slug: post.slug }))

export const generateMetadata = ({ params }: { params: Work }) => {
  const post = allWorks.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }
  const { title, summary: description, image, slug } = post
  const ogImage = image

  return {
    description,
    openGraph: {
      description,
      images: [
        {
          url: ogImage,
        },
      ],
      title,
      url: `/work/${slug}`,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: [ogImage],
      title,
    },
  }
}

export default async function WorkLayout({ params }: { params: { slug: string } }) {
  const post = allWorks.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const toc = await getTableOfContents(post.body.raw)

  return (
    <div className="relative flex pb-16 pt-10">
      <div>
        <div className="space-y-2 pb-10 pt-4">
          <div className="text-2xl font-bold">{post.title}</div>
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
