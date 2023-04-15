import { ReactNode } from 'react'
import type { Extras } from 'contentlayer/generated'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import PageTitle from '@/components/PageTitle'

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
        <div className="py-10">
          <PageTitle>About</PageTitle>
          <p>A space to learn more about me and my journey.</p>
        </div>
        <div className="space-x-4 flex pb-10">
          <a
            href="https://read.cv/kent"
            target="_blank"
            rel="noreferrer noopner"
            aria-label="Read.cv"
            className=""
            tabIndex={-1}
          >
            <button className="buttonStyle">Read.cv</button>
          </a>
          <a
            href={`mailto:${siteMetadata.email}`}
            rel="noreferrer noopner"
            aria-label="Contact"
            className=""
            tabIndex={-1}
          >
            <button className="buttonStyle">Contact</button>
          </a>
        </div>
        <div className="items-start space-y-2">
          <div className="flex flex-col items-center">
            {/* <Image src={avatar} alt="avatar" width={200} height={200} className="h-48 w-48" /> */}
          </div>
          <div className="prose max-w-none dark:prose-dark">{children}</div>
        </div>
      </div>
    </>
  )
}
