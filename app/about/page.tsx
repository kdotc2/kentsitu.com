import { allMiscs } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@/components/mdx/MDXComponents'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { LayoutHeader } from '@/components/Layout'

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
      <div className="">
        <LayoutHeader
          title={metainfo.title}
          description={metainfo.description}
        />
        <div className="">
          <div className="prose max-w-none dark:prose-invert">
            <Mdx content={post} MDXComponents={MDXComponents} />
          </div>
        </div>
        <div className="flex space-x-4 pt-6">
          <Link
            className="linkStyle"
            href="/Kent_Situ_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </Link>
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
