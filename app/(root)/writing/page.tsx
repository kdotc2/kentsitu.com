import { allWritings } from 'contentlayer/generated'
import { sortedWritingPost } from '@/lib/utils/contentlayer'
import type { Writing } from 'contentlayer/generated'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/formatDate'
import { PageLayout } from '@/components/layouts/PageLayout'
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
    images: {
      url: ogImage,
    },
  },
  title: metainfo.title,
}

export default async function Writing() {
  const posts = sortedWritingPost(allWritings)

  return (
    <PageLayout
      title={metainfo.title}
      description={metainfo.description}
      className="grid md:gap-4 gap-5"
    >
      {posts.map((post) => {
        const { slug, title, summary, date, draft } = post
        return (
          !draft && (
            <Link key={title} href={`/writing/${slug}`} className="cardStyle">
              <div className="w-full text-base p-4">
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

                <div className="flex flex-wrap text-sm text-muted-foreground">
                  {summary}
                </div>
              </div>
            </Link>
          )
        )
      })}
    </PageLayout>
  )
}
