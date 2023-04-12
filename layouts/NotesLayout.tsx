import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { CoreContent } from '@/lib/utils/contentlayer'
import type { Notes } from 'contentlayer/generated'
import formatDate from '@/lib/utils/formatDate'
import Link from 'next/link'
import CustomLink from '@/components/Link'
import Masonry from 'react-masonry-css'

interface Props {
  posts: CoreContent<Notes>[]
  initialDisplayPosts?: CoreContent<Notes>[]
}

const breakpointColumnsObj = {
  default: 2,
  768: 1,
}

export default function NotesLayout({ initialDisplayPosts = [] }: Props) {
  const displayPosts = initialDisplayPosts.length > 0 && initialDisplayPosts

  return (
    <>
      <PageSEO title={`Notes - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="min-h-[calc(100vh-60px)] px-6 pb-16 sm:pb-20">
        <div className="space-y-2 py-24 text-center sm:py-40 md:space-y-5">
          <h1 className="text-2xl leading-9 sm:text-4xl sm:leading-10 md:leading-14 tracking-wide">
            Keeping track of progress and thoughts.
          </h1>
        </div>
        <div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {displayPosts.map((post) => {
              const { slug, date, title, summary } = post
              return (
                <CustomLink
                  key={slug}
                  href={`/notes/${slug}`}
                  className="focus:rounded-[10px] focus:-outline-offset-1"
                >
                  <div className="cursor-pointer mb-4 px-6 py-6 md:py-8 md:px-8 md:hover:bg-gray-200 md:dark:hover:bg-gray-800 md:hover:rounded-[10px] border-2 rounded-[10px]">
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
                </CustomLink>
              )
            })}
          </Masonry>
        </div>
      </div>
    </>
  )
}
