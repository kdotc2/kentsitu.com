import { Work, Project, Writing } from 'content-collections'

type Post = Work | Project | Writing

const generateStaticParamsForContent = (
  allContent: Post[]
): { slug: string }[] => {
  return allContent
    .filter((post) => !post.draft) // exclude drafts
    .map((post) => ({ slug: post.slug }))
}

const getContentBySlug = (slug: string, allContent: Post[]) => {
  return allContent.find((post) => post.slug === slug)
}

const getMetadataBySlug = async ({
  slug,
  allContent,
}: {
  slug: string
  allContent: Post[]
}) => {
  const post = getContentBySlug(slug, allContent)

  if (!post || post.draft) {
    return {}
  }

  const { title, summary: description, image } = post
  const ogImage = `/og?title=${title}&description=${description}`

  return {
    title,
    description,
    openGraph: {
      images: {
        url: image ?? ogImage,
      },
    },
  }
}

export { getContentBySlug, generateStaticParamsForContent, getMetadataBySlug }
