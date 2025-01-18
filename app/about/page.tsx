import { allMiscs } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@components/Mdx/MDXComponents'
import { notFound } from 'next/navigation'
import LayoutHeader from '@components/LayoutHeader'
import { Metadata } from 'next'
import Link from 'next/link'

const metainfo = {
  title: 'About',
  description: 'A space to learn more about me and my journey.',
}

export const metadata: Metadata = {
  title: metainfo.title,
  description: metainfo.description,
}

export default async function AboutLayout() {
  const post = allMiscs.find((p) => p.slug === 'about')

  if (!post) {
    notFound()
  }

  return (
    <>
      <div className="pb-16 pt-10">
        <LayoutHeader title={metainfo.title} description={metainfo.description} />
        <div className="">
          <div className="prose max-w-none dark:prose-dark">
            <Mdx content={post} MDXComponents={MDXComponents} />
          </div>
        </div>
        <div className="flex space-x-4 pt-6">
          <a href="/static/Kent_Situ_Resume.pdf" download>
            <button className="linkStyle">Resume</button>
          </a>
          {/* <Link
            className="linkStyle"
            href="https://read.cv/kent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read.cv
          </Link> */}
          <Link
            className="linkStyle"
            href={`mailto:hello@kentsitu.com`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  )
}
