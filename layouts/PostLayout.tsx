import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { PageSEO } from '@/components/SEO'
import { CoreContent } from '@/lib/utils/contentlayer'
import { ReactNode } from 'react'
import type { Notes, Work } from 'contentlayer/generated'
import ScrollTop from '@/components/ScrollTop'

interface Props {
  content: CoreContent<Notes> & CoreContent<Work>
  children: ReactNode
}

export default function PostLayout({ content, children }: Props) {
  const { title, description } = content

  return (
    <SectionContainer>
      <PageSEO title={title} description={''} />
      <article>
        <div className="divide-gray-200 px-6 pb-16 dark:divide-gray-700 sm:pb-24">
          <header className="pt-10 pb-6">
            <div className="space-y-1">
              <div>
                <PageTitle>{title}</PageTitle>
                <p className="pt-2 text-gray-500 dark:text-gray-400">{description}</p>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 dark:divide-gray-700 xl:divide-y-0 "
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 dark:prose-dark">{children}</div>
            </div>
          </div>
        </div>
      </article>
      <ScrollTop />
    </SectionContainer>
  )
}
