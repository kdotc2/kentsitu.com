/* eslint-disable @next/next/no-img-element */

import AnimateEnter from '@components/AnimateEnter'
import LayoutHeader from '@components/LayoutHeader'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { title } from 'process'
import { Metadata } from 'next'

// type Metadata = {
//   title?: string
//   description?: string
//   images?: string[]
//   domain: string
//   url: string
// }

// TO DO: Need to figure out how to get prefetch JSON data into JSON file prebuild or find another metascraper API

const metainfo = {
  title: 'Bookmarks',
  description: 'A space for inspiring portfolios and useful links.',
}

export const metadata: Metadata = {
  title: metainfo.title,
  description: metainfo.description,
}

type MetaData = {
  data: {
    title: string
    description: string
    image: { url: string }
    url: string
  }
}

const bookmarkedLinks = [
  'brianlovin.com',
  'timlrx.com',
  'vyshnav.xyz',
  'rauno.me',
  'musing.vercel.app',
  'cretu.dev',
  'iamrob.in',
  'neal.fun',
]

async function getMetadata(link: string): Promise<MetaData> {
  // const res = await fetch(`https://jsonlink.io/api/extract?url=https://${link}`)
  const res = await fetch(`https://api.microlink.io/?url=https://${link}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function BookmarksLayout() {
  const randomList = bookmarkedLinks.sort(() => Math.random() - 0.5)
  const data = await Promise.all<MetaData>(randomList.map((url) => getMetadata(url)))

  return (
    <>
      <div className="py-10">
        <LayoutHeader title={metainfo.title} description={metainfo.description} />
        <AnimateEnter>
          <div className="-mx-6 columns-1 md:columns-2 lg:columns-3 xl:columns-4">
            {/* <div className="-mx-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> */}
            {data.map((metadata, i) => (
              <div key={i} className="inline-block">
                <Link
                  href={metadata.data.url}
                  aria-label={`Link to ${title}`}
                  className="rounded-[10px] focus:-outline-offset-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="cardStyle">
                    <img
                      className="relative flex-shrink-0 rounded-xl"
                      alt={metadata.data.image + 'image'}
                      src={metadata.data.image.url}
                      width={800}
                      height={600}
                    />
                    <div className="w-full px-2 text-sm">
                      <div className="flex items-center gap-2 font-bold leading-8">
                        {metadata.data.title} <ArrowUpRightIcon className="h-3 w-3" />
                      </div>
                      <div className="flex flex-wrap text-gray-500 dark:text-gray-400">
                        {metadata.data.description}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </AnimateEnter>
      </div>
    </>
  )
}
