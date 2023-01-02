import { PageSEO } from '@/components/SEO'
import { ReactNode } from 'react'
import type { Extras } from 'contentlayer/generated'

interface Props {
  children: ReactNode
  content: Omit<Extras, '_id' | '_raw' | 'body'>
}

export default function ExtraLayout({ children, content }: Props) {
  const { name } = content

  return (
    <>
      <PageSEO title={`${name}`} description={`${name}`} />
      <div className="px-6">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
            {name}
          </h1>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">{children}</div>
        </div>
      </div>
    </>
  )
}
