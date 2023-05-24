import { allMiscs } from 'contentlayer/generated'
import { MDXComponents, Mdx } from '@components/Mdx/MDXComponents'
import { notFound } from 'next/navigation'
import LayoutHeader from '@components/LayoutHeader'
import { Metadata } from 'next'

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
      <div className="py-10">
        <LayoutHeader title={metainfo.title} description={metainfo.description} />

        <div className="">
          <div className="prose max-w-none dark:prose-dark">
            <article>
              <Mdx content={post} MDXComponents={MDXComponents} />
            </article>
          </div>
        </div>
        <div className="flex space-x-4 pt-6">
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
            href={`mailto:hello@kentsitu.com`}
            rel="noreferrer noopner"
            aria-label="Contact"
            className=""
            tabIndex={-1}
          >
            <button className="buttonStyle">Contact</button>
          </a>
        </div>
      </div>
    </>
  )
}
