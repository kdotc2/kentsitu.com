import { allNotes } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { sortedNotesPost, allCoreContent } from '@/lib/utils/contentlayer'
import NotesLayout from '@/layouts/NotesLayout'

export const getStaticProps = async () => {
  const posts = sortedNotesPost(allNotes)
  const initialDisplayPosts = posts.slice(0)

  return {
    props: {
      initialDisplayPosts: allCoreContent(initialDisplayPosts),
      posts: allCoreContent(posts),
    },
  }
}

export default function Notes({
  posts,
  initialDisplayPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NotesLayout posts={posts} initialDisplayPosts={initialDisplayPosts} />
    </>
  )
}
