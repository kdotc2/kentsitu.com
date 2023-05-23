import { allWritings } from 'contentlayer/generated'
import { sortedWritingPost } from '@lib/utils/contentlayer'
import type { Writing } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@lib/utils/utils'
import LayoutHeader from '@components/LayoutHeader'
import { Metadata } from 'next'

const metainfo = {
  title: 'Writing',
  description: 'A space to keep track of progress and thoughts.',
}

export const metadata: Metadata = {
  title: metainfo.title,
  description: metainfo.description,
}

export default async function Writing() {
  const posts = sortedWritingPost(allWritings)
  return (
    <>
      <div className="mx-auto py-10">
        <LayoutHeader
          title={metainfo.title}
          description={metainfo.description}
        />
        <div className="-mx-6">
          {posts.map((post) => {
            const { slug, title, summary, date, draft } = post
            return (
              <div key={title}>
                <Link
                  href={`/writing/${slug}`}
                  aria-label={`Link to ${title}`}
                  className="rounded-[10px] focus:-outline-offset-1"
                >
                  <div className="cardStyle">
                    <div className="w-full text-base">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="font-bold leading-8">{title}</div>
                        <dd className="font-mono text-sm font-medium leading-6">
                          {draft ? (
                            'In progress...'
                          ) : (
                            <time dateTime={date}>{formatDate(date)}</time>
                          )}
                        </dd>
                      </div>

                      <div className="flex flex-wrap text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
