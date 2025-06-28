import { allProjects } from 'contentlayer/generated'
import { sortedProjectsPost } from '@/lib/utils/contentlayer'
import Image from 'next/image'
import Link from '@/components/nav/Link'
import { PageLayout } from '@/components/layouts/PageLayout'
import { Metadata } from 'next'

const metainfo = {
  title: 'Projects',
  description:
    'A space to showcase side projects. Designing and bringing ideas to life.',
}

export const metadata: Metadata = {
  title: metainfo.title,
  description: metainfo.description,
}

export default async function Projects() {
  const posts = sortedProjectsPost(allProjects)
  return (
    <PageLayout
      title={metainfo.title}
      description={metainfo.description}
      className="grid grid-cols-1 md:gap-4 gap-5 lg:grid-cols-2"
    >
      {posts.map((post) => {
        const { slug, title, summary, image, tags } = post
        return (
          <Link key={title} href={`/projects/${slug}`} className="cardStyle">
            <Image
              className="relative shrink-0 border-b"
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
              <div className="flex items-center gap-x-3 truncate pt-2 text-xs uppercase text-muted-foreground">
                {tags?.map((tag: string) => (
                  <p key={tag}>{tag}</p>
                ))}
              </div>
            </div>
          </Link>
        )
      })}
    </PageLayout>
  )
}
