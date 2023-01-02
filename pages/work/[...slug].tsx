import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { MDXComponents } from '@/components/MDXComponents'
import { sortedWorkPost } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allWorks } from 'contentlayer/generated'
import type { Work } from 'contentlayer/generated'
import Construction from '@/components/Construction'

const DEFAULT_LAYOUT = 'WorkLayout'

export async function getStaticPaths() {
  return {
    paths: allWorks.map((p) => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = (params.slug as string[]).join('/')
  const sortedPosts = sortedWorkPost(allWorks) as Work[]
  const post = sortedPosts.find((p) => p.slug === slug)

  return {
    props: {
      post,
    },
  }
}

export default function WorkPostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {'draft' in post && post.draft === true ? (
        <Construction />
      ) : (
        <MDXLayoutRenderer
          layout={post.layout || DEFAULT_LAYOUT}
          content={post}
          MDXComponents={MDXComponents}
          toc={post.toc}
        />
      )}
    </>
  )
}
