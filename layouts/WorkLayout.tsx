import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import type { Work } from 'contentlayer/generated'
import { CoreContent } from '@/lib/utils/contentlayer'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/components/Pagination'
import { ComponentProps } from 'react'

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
      <div className="min-h-[calc(100vh-140px)] px-6 pb-6 sm:pb-8">
        <div className="space-y-2 py-24 text-center sm:py-40 md:space-y-5">
          <h2 className="text-2xl leading-9 sm:text-4xl sm:leading-10 md:leading-14">
            Designing user experiences from the ground up.
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          {displayPosts.map((post) => {
            const { slug, title, summary, cover } = post
            return (
              <div className="" key={title}>
                <Link href={`/work/${slug}`} aria-label={`Link to ${title}`}>
                  <div className="flex flex-col mx-auto max-w-screen-xl rounded-[10px] border-2 md:flex-row md:hover:bg-gray-200 md:dark:hover:bg-gray-800 cursor-pointer">
                    <Image
                      className="relative flex-shrink-0 rounded-t-[8px] md:w-1/2 md:rounded-none md:rounded-r-[8px]"
                      alt={title}
                      src={cover}
                      width={800}
                      height={600}
                    />
                    <div className="flex-none md:place-self-center py-10 px-6 md:order-first md:w-1/2 md:px-8">
                      <div className="space-y-2 md:space-y-3">
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">{title}</h2>
                        <div className="flex flex-wrap prose text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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
