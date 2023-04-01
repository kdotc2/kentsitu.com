import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { MDXComponents } from '@/components/MDXComponents'
import { sortedProjectsPost } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allProjects } from 'contentlayer/generated'
import type { Projects } from 'contentlayer/generated'
import Construction from '@/components/Construction'

const DEFAULT_LAYOUT = 'ProjectLayout'

export async function getStaticPaths() {
  return {
    paths: allProjects.map((p) => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = (params.slug as string[]).join('/')
  const sortedPosts = sortedProjectsPost(allProjects) as Projects[]
  const post = sortedPosts.find((p) => p.slug === slug)

  return {
    props: {
      post,
    },
  }
}

export default function ProjectsPostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
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
