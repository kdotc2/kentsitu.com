import { allWorks } from 'contentlayer/generated'
import { sortedWorkPost } from '@lib/utils/contentlayer'
import type { Work } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import LayoutHeader from '@components/LayoutHeader'
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
    <>
      <div className="pb-16 pt-10">
        <LayoutHeader
          title={metainfo.title}
          description={
            <>
              A space to showcase selected work.{' '}
              <Link
                href="mailto:hello@kentsitu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 hover:dark:text-blue-400"
              >
                Contact me
              </Link>{' '}
              if you want to learn more about my work.
            </>
          }
        />
        <div className="-mx-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {posts.map((post) => {
            const { slug, title, summary, image, draft } = post
            return (
              !draft && (
                <div key={title} className="grid">
                  <div className="flex h-auto w-full">
                    <Link href={`/work/${slug}`} className="rounded-[10px] focus:-outline-offset-1">
                      <div className="cardStyle">
                        <Image
                          className="relative flex-shrink-0 rounded-xl"
                          alt={title + ' Cover Photo'}
                          src={image}
                          width={800}
                          height={600}
                        />
                        <div className="w-full px-2">
                          <div className="font-bold leading-8">{title}</div>
                          <div className="flex flex-wrap text-sm text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            )
          })}
        </div>
      </div>
    </>
  )
}
