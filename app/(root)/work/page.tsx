import { allWorks } from 'contentlayer/generated'
import { sortedWorkPost } from '@/lib/utils/contentlayer'
import type { Work } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import { PageLayout } from '@/components/layouts/PageLayout'
import { Metadata } from 'next'

const metainfo = {
  title: 'Work',
  description: `A space to showcase selected work. Solving problems and designing user experiences.`,
}

export const metadata: Metadata = {
  title: metainfo.title,
  description: metainfo.description,
}

export default async function Work() {
  const posts = sortedWorkPost(allWorks)

  return (
    <PageLayout
      title={metainfo.title}
      description={metadata.description}
      className="grid grid-cols-1 md:gap-4 gap-5 lg:grid-cols-2"
    >
      {posts.map((post) => {
        const { slug, title, summary, image, draft } = post
        return (
          !draft && (
            <Link key={title} href={`/work/${slug}`} className="cardStyle">
              <Image
                className="relative flex-shrink-0 border-b"
                alt={title + ' Cover Photo'}
                src={image}
                width={800}
                height={600}
              />
              <div className="w-full p-4">
                <p className="font-bold leading-8">{title}</p>
                <p className="flex flex-wrap text-sm text-muted-foreground">
                  {summary}
                </p>
              </div>
            </Link>
          )
        )
      })}
    </PageLayout>
  )
}
