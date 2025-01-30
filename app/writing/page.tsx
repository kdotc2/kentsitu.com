import { allWritings } from 'contentlayer/generated'
import { sortedWritingPost } from '@/lib/utils/contentlayer'
import type { Writing } from 'contentlayer/generated'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/formatDate'
import { LayoutHeader } from '@/components/Layout'
import { Metadata } from 'next'

const metainfo = {
  title: 'Writing',
  description:
    'A space to dump words. Keep track of progress, ideas, and thoughts.',
}

const ogImage = `/og?title=${metainfo.title}&description=${metainfo.description}`

export const metadata: Metadata = {
  description: metainfo.description,
  openGraph: {
    description: metainfo.description,
    images: [
      {
        url: ogImage,
      },
    ],
    title: metainfo.title,
    url: `/writing`,
  },
  title: metainfo.title,
  twitter: {
    card: 'summary_large_image',
    description: metainfo.description,
    images: [ogImage],
    title: metainfo.title,
  },
}

export default async function Writing() {
  const posts = sortedWritingPost(allWritings)

  return (
    <>
      <div className="mx-auto ">
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
                  className="rounded-[10px] focus:-outline-offset-1"
                >
                  {!draft && (
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

                        <div className="flex flex-wrap text-sm text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
