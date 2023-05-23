import { Writing, allWritings } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@components/Mdx/MDXComponents'
import Construction from '@components/Construction'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () =>
  allWritings.map((post: any) => ({ slug: post.slug }))
export const generateMetadata = ({ params }: { params: Writing }) => {
  const post = allWritings.find((post: any) => post.slug === params.slug)
  if (!post) {
    return
  }
  const { title, summary: description, image, slug } = post
  const ogImage = image

  return {
    description,
    openGraph: {
      description,
      // images: [
      //   {
      //     url: ogImage,
      //   },
      // ],
      title,
      url: `/writing/${slug}`,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      // images: [ogImage],
      title,
    },
  }
}

export default async function WritingLayout({
  params,
}: {
  params: { slug: string }
}) {
  const post = allWritings.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      {post.draft ? (
        <Construction />
      ) : (
        <div className="py-10">
          <div className="space-y-2 pb-6 pt-4">
            <div className="text-2xl font-bold">{post.title}</div>
            <p className="text-gray-500 dark:text-gray-400">{post.summary}</p>
          </div>
          <div className="prose max-w-none dark:prose-dark">
            <article>
              <Mdx content={post} MDXComponents={MDXComponents} />
            </article>
          </div>
        </div>
      )}
    </>
  )
}
