import { ReactNode } from 'react'
import type { Extras } from 'contentlayer/generated'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  children: ReactNode
  content: Omit<Extras, '_id' | '_raw' | 'body'>
}

export default function AboutLayout({ children, content }: Props) {
  const { name, avatar } = content

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="px-6 pb-16 sm:pb-24">
        <div className="items-start space-y-2">
          <div className="flex flex-col items-center py-8">
            <Image src={avatar} alt="avatar" width={200} height={200} className="h-48 w-48" />
            <div className="pt-12 space-x-12">
              <a
                href={`mailto:${siteMetadata.email}`}
                rel="noreferrer noopner"
                aria-label="Contact"
                className=""
                tabIndex={-1}
              >
                <button className="text-medium text-gray-900 dark:text-gray-200 rounded-md border-2 py-[14px] px-6 font-medium hover:bg-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
                  Contact
                </button>
              </a>
              <a
                href="https://read.cv/kent"
                target="_blank"
                rel="noreferrer noopner"
                aria-label="Read.cv"
                className=""
                tabIndex={-1}
              >
                <button className="text-medium text-gray-900 dark:text-gray-200 rounded-md border-2 py-[14px] px-6 font-medium hover:bg-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
                  Read.cv
                </button>
              </a>
            </div>
          </div>
          <div className="prose max-w-none pt-10 dark:prose-dark">{children}</div>
        </div>
      </div>
    </>
  )
}
