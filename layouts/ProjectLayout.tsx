import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import type { Projects } from 'contentlayer/generated'
import { CoreContent } from '@/lib/utils/contentlayer'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/components/Pagination'
import { ComponentProps } from 'react'
import { RiArrowRightUpLine } from 'react-icons/ri'
import CustomLink from '@/components/Link'

interface Props {
  posts: CoreContent<Projects>[]
  initialDisplayPosts?: CoreContent<Projects>[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function ProjectsLayout({ initialDisplayPosts = [], pagination }: Props) {
  const displayPosts = initialDisplayPosts.length > 0 && initialDisplayPosts

  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description={'siteMetadata.description'}
      />
      <div className="px-6 pb-16 sm:pb-20">
        <div className="space-y-2 py-24 text-center sm:py-40 md:space-y-5">
          <h2 className="text-2xl leading-9 sm:text-4xl sm:leading-10 md:leading-14 tracking-wide">
            Building and bringing ideas to life.
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          {displayPosts.map((post) => {
            const { slug, title, summary, cover, readingTime, link } = post
            return (
              <div className="" key={title}>
                <CustomLink
                  href={`/projects/${slug}`}
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
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">{title}</h2>
                        <div className="flex flex-wrap prose text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                        <div className="group pointer-events-auto lowercase hover:underline">
                          <a
                            href={`https://${link}`}
                            target="_blank"
                            rel="noreferrer"
                            className="items-center inline-flex  gap-1"
                            onClick={(event) => {
                              event.stopPropagation()
                            }}
                          >
                            {link}
                            <RiArrowRightUpLine className="" />
                          </a>
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
