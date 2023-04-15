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
        <div className="px-6 pb-16 sm:pb-24">
          <header className="pt-10 pb-6">
            <div>
              <PageTitle>{title}</PageTitle>
              <p className="text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </header>
          <div className="prose prose-h2:sm:text-xl prose-h2:text-lg max-w-none pt-10 dark:prose-dark">{children}</div>
        </div>
      </article>
      <ScrollTop />
    </SectionContainer>
  )
}
