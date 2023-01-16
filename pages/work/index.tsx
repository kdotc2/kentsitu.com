import { allWorks } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { sortedWorkPost, allCoreContent } from '@/lib/utils/contentlayer'
import WorkLayout from '@/layouts/WorkLayout'

export const POSTS_PER_PAGE = 4

export const getStaticProps = async () => {
  const posts = sortedWorkPost(allWorks)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      initialDisplayPosts: allCoreContent(initialDisplayPosts),
      posts: allCoreContent(posts),
      pagination,
    },
  }
}

export default function Work({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <WorkLayout posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} />
    </>
  )
}
