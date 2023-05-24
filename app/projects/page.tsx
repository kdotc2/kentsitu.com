import { allProjects } from 'contentlayer/generated'
import { sortedProjectsPost } from '@lib/utils/contentlayer'
import Image from 'next/image'
import Link from 'next/link'
import LayoutHeader from '@components/LayoutHeader'
import { Metadata } from 'next'

const metainfo = {
  title: 'Projects',
  description:
    "A space for side projects. Designing and bringing ideas to life. Learning how to build them when there's time.",
}

export const metadata: Metadata = {
  title: metainfo.title,
  description: metainfo.description,
}

export default async function Projects() {
  const posts = sortedProjectsPost(allProjects)
  return (
    <>
      <div className="py-10">
        <LayoutHeader title={metainfo.title} description={metainfo.description} />
        <div className="-mx-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {posts.map((post) => {
            const { slug, title, summary, image, tags } = post
            return (
              <div key={title}>
                <Link
                  href={`/projects/${slug}`}
                  aria-label={`Link to ${title}`}
                  className="rounded-[10px] focus:-outline-offset-1"
                >
                  <div className="cardStyle">
                    <Image
                      className="relative flex-shrink-0 rounded-xl"
                      alt={title + ' Cover Photo'}
                      src={image}
                      width={800}
                      height={600}
                    />
                    <div className="w-full px-2 text-base">
                      <div className="font-bold leading-8">{title}</div>
                      <div className="flex flex-wrap text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                      <div className="flex items-center gap-x-3 truncate py-2 text-xs uppercase text-gray-500 dark:text-gray-400">
                        {tags?.map((tag: string) => (
                          <div key={tag}>{tag}</div>
                        ))}
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
