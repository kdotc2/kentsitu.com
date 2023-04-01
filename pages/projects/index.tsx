import { allProjects } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { sortedProjectsPost, allCoreContent } from '@/lib/utils/contentlayer'
import ProjectLayout from '@/layouts/ProjectLayout'

export const POSTS_PER_PAGE = 10

export const getStaticProps = async () => {
  const posts = sortedProjectsPost(allProjects)
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

export default function Projects({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ProjectLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </>
  )
}
