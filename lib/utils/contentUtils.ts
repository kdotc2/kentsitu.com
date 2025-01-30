import { Work, Projects, Writing } from 'contentlayer/generated'

type Post = Work | Projects | Writing

const getContentBySlug = (slug: string, allContent: Post[]) => {
  return allContent.find((post) => post.slug === slug && !post.draft)
}

const generateStaticParamsForContent = (
  allContent: Post[]
): { slug: string }[] => {
  return allContent
    .filter((post) => !post.draft)
    .map((post) => ({ slug: post.slug }))
}

const generateMetadataForContent = async ({
  params,
  allContent,
  basePath,
}: {
  params: { slug: string }
  allContent: Post[]
  basePath: string
}) => {
  const resolvedParams = await params
  const post = getContentBySlug(resolvedParams.slug, allContent)

  if (!post) {
    return {}
  }

  const { title, summary: description, image, slug } = post

  return {
    description,
    openGraph: {
      description,
      images: [
        {
          url: image,
        },
      ],
      title,
      url: `${basePath}/${slug}`,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: [image],
      title,
    },
  }
}

export {
  getContentBySlug,
  generateStaticParamsForContent,
  generateMetadataForContent,
}
