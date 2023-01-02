import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { sortedNotesPost } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allNotes } from 'contentlayer/generated'
import { MDXComponents } from '@/components/MDXComponents'
import type { Notes } from 'contentlayer/generated'
import Construction from '@/components/Construction'

const DEFAULT_LAYOUT = 'PostTimeLayout'

export async function getStaticPaths() {
  return {
    paths: allNotes.map((p) => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = (params.slug as string[]).join('/')
  const sortedPosts = sortedNotesPost(allNotes) as Notes[]
  const post = sortedPosts.find((p) => p.slug === slug)

  return {
    props: {
      post,
    },
  }
}

export default function NotesPostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
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
