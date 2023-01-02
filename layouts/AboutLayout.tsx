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
      <div className="min-h-[calc(100vh-140px)] px-6 py-4 pb-10">
        <div className="items-start space-y-2">
          <div className="flex flex-col items-center py-8">
            <Image src={avatar} alt="avatar" width={200} height={200} className="h-48 w-48" />
            <div className="pt-12">
              <Link href={`mailto:${siteMetadata.email}`}>
                <button className="buttonStyle">Contact</button>
              </Link>
            </div>
          </div>
          <div className="prose max-w-none pt-10 dark:prose-dark">{children}</div>
        </div>
      </div>
    </>
  )
}
