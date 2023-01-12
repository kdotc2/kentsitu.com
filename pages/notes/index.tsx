import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { sortedNotesPost } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allNotes } from 'contentlayer/generated'
import type { Notes } from 'contentlayer/generated'
import formatDate from '@/lib/utils/formatDate'
import Link from 'next/link'
import Masonry from 'react-masonry-css'

export const getStaticProps = async () => {
  const posts = sortedNotesPost(allNotes) as Notes[]
  return { props: { posts } }
}

const breakpointColumnsObj = {
  default: 2,
  768: 1,
}

export default function Notes({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`Notes - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="min-h-[calc(100vh-60px)] px-6 pb-10 sm:pb-16">
        <div className="space-y-2 py-24 text-center sm:py-40 md:space-y-5">
          <h1 className="text-2xl leading-9 sm:text-4xl sm:leading-10 md:leading-14">
            Keeping track of progress and thoughts.
          </h1>
        </div>
        <div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map((post) => {
              const { slug, date, title, summary } = post
              return (
                <Link key={slug} href={`/notes/${slug}`}>
                  <div className="cursor-pointer mb-4 px-6 py-6 md:py-8 md:px-8 md:hover:bg-gray-200 md:dark:hover:bg-gray-800 md:hover:rounded-lg border-2 rounded-lg break-inside-avoid-column">
                    <div className="space-y-2 md:space-y-3">
                      <h2 className="text-2xl font-bold leading-8 tracking-tight">{title}</h2>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </Masonry>
        </div>
      </div>
    </>
  )
}
