import { Projects, Slides, Work, Writing } from '@/.contentlayer/generated'
import { Mdx, MDXComponents } from '@/components/mdx/MDXComponents'
import { TableOfContents, TocProps } from '@/components/mdx/Toc'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const Header = ({
  title,
  description,
  titleLink,
  url,
}: {
  title: string
  description: React.ReactNode
  titleLink?: boolean
  url?: string
}) => {
  return (
    <div className="space-y-2">
      {titleLink ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={url}
          className="inline-block"
        >
          <span className="flex items-center gap-2 text-2xl font-bold">
            {title}
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </a>
      ) : (
        <div className="text-2xl font-bold">{title}</div>
      )}
      <p>{description}</p>
    </div>
  )
}

export const PageLayout = ({
  title,
  description,
  children,
  className,
}: {
  title: string
  description: React.ReactNode
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className="relative pb-14 space-y-14">
      {/* layout header */}
      <Header title={title} description={description} />
      <div className={className}>{children}</div>
    </div>
  )
}

export const SlugContentLayout = ({
  className,
  contentClassName,
  post,
  toc,
  titleLink,
  showHeader = true,
}: {
  className?: string
  contentClassName?: string
  post: Work | Writing | Projects | Slides
  toc?: TocProps['toc']
  titleLink?: boolean
  showHeader?: boolean
}) => {
  const url = 'url' in post ? post.url : undefined

  return (
    <>
      <div className={cn('pb-14 space-y-14', className)}>
        {showHeader && (
          <Header
            title={post.title}
            description={post.summary}
            titleLink={titleLink}
            url={url}
          />
        )}
        <div
          className={cn('prose max-w-none dark:prose-invert', contentClassName)}
        >
          <Mdx content={post} MDXComponents={MDXComponents} />
        </div>
      </div>
      {toc && (
        <div className="hidden max-w-[200px] text-sm 2xl:block">
          <div className="sticky top-14 flex">
            <TableOfContents toc={toc} />
          </div>
        </div>
      )}
    </>
  )
}
