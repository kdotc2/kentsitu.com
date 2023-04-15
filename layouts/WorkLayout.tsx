import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import type { Work } from 'contentlayer/generated'
import { CoreContent } from '@/lib/utils/contentlayer'
import CustomLink from '@/components/Link'
import Image from 'next/image'
import Pagination from '@/components/Pagination'
import { ComponentProps } from 'react'
import PageTitle from '@/components/PageTitle'

interface Props {
  posts: CoreContent<Work>[]
  initialDisplayPosts?: CoreContent<Work>[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function WorkLayout({ initialDisplayPosts = [], pagination }: Props) {
  const displayPosts = initialDisplayPosts.length > 0 && initialDisplayPosts

  return (
    <>
      <PageSEO title={`Work - ${siteMetadata.author}`} description={'siteMetadata.description'} />
      <div className="px-6 pb-16 sm:pb-20">
        <div className="pt-10 pb-16">
          <PageTitle>Work</PageTitle>
          <p>A space for curated work. Designing user experiences from the ground up.</p>
        </div>
        <div className="flex flex-col gap-5">
          {displayPosts.map((post) => {
            const { slug, title, summary, cover, readingTime } = post
            return (
              <div key={title}>
                <CustomLink
                  href={`/work/${slug}`}
                  aria-label={`Link to ${title}`}
                  className="rounded-[10px] focus:-outline-offset-1"
                >
                  <div className="group flex flex-col mx-auto max-w-screen-xl rounded-[10px] border-2 md:flex-row md:hover:bg-gray-200 md:dark:hover:bg-gray-800 cursor-pointer">
                    <Image
                      className="relative flex-shrink-0 rounded-t-[8px] md:w-1/2 md:rounded-none md:rounded-r-[8px] md:group-hover:opacity-80"
                      alt={title}
                      src={cover}
                      width={800}
                      height={600}
                    />
                    <div className="flex-none md:place-self-center py-10 px-6 md:order-first md:w-1/2 md:px-8">
                      <div className="space-y-2 md:space-y-3">
                        <h2 className="text-xl font-bold leading-8">{title}</h2>
                        <div className="flex flex-wrap prose text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                        {/* <div> {readingTime.text}</div> */}
                      </div>
                    </div>
                  </div>
                </CustomLink>
              </div>
            )
          })}
        </div>
        <div className="">
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}
