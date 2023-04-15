import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { PageSEO } from '@/components/SEO'
import { CoreContent } from '@/lib/utils/contentlayer'
import { ReactNode } from 'react'
import type { Notes, Work } from 'contentlayer/generated'
import ScrollTop from '@/components/ScrollTop'

// const postDateTemplate: Intl.DateTimeFormatOptions = {
//   // weekday: 'long',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
// }

interface Props {
  content: CoreContent<Notes> & CoreContent<Work>
  children: ReactNode
}

export default function PostTimeLayout({ content, children }: Props) {
  const { title, description } = content

  return (
    <SectionContainer>
      <PageSEO title={title} description={''} />
      <article>
        <div className="px-6 pb-16 sm:pb-24">
          <header className="pt-10">
            <div>
              <PageTitle>{title}</PageTitle>
              <p className="text-gray-500 dark:text-gray-400">{description}</p>
              {/* <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div> */}
            </div>
          </header>
          <div className="prose max-w-none pt-10 prose-h2:text-lg dark:prose-dark prose-h2:sm:text-xl">
            {children}
          </div>
        </div>
      </article>
      <ScrollTop />
    </SectionContainer>
  )
}
