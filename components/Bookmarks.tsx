/* eslint-disable @next/next/no-img-element */
'use client'
import bookmarkItems from '@data/bookmarkItems'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
  default: 3,
  1280: 2,
  640: 1,
}

type MetaData = {
  title: string
  description: string
  image: string
  url: string
}

const randomList = bookmarkItems.sort(() => 0.5 - Math.random())

async function getMetadata(link: string): Promise<MetaData> {
  const res = await fetch(`https://metainfo.vercel.app/api?url=https://${link}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default function Bookmarks() {
  const [page, setPage] = useState(1)
  const [bookmarks, setBookmarks] = useState<MetaData[]>([])
  const lastBookmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((prevPage) => prevPage + 1)
      }
    })

    let observerRefValue: HTMLDivElement | null = null

    if (lastBookmarkRef.current) {
      observer.observe(lastBookmarkRef.current)
      observerRefValue = lastBookmarkRef.current
    }

    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue)
    }
  }, [])

  useEffect(() => {
    async function fetchBookmarks() {
      const data = await Promise.all(randomList.slice(0, page * 6).map((url) => getMetadata(url)))
      setBookmarks(data)
    }

    fetchBookmarks()
  }, [page])

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {bookmarks.map((bookmark) => (
          <div key={bookmark.url} className="inline-block">
            <Link
              href={bookmark.url}
              // aria-label={`Link to ${title}`}
              className="space-y-3 rounded-[10px] focus:-outline-offset-1"
              target="_blank"
              rel="noreferrer"
            >
              <div className="cardStyle">
                <img
                  className="relative flex-shrink-0 rounded-xl"
                  src={bookmark.image}
                  alt={bookmark.title}
                  width={800}
                  height={600}
                />
                <div className="w-full space-y-1.5 px-2 text-sm">
                  <div className="flex items-center gap-2 font-bold ">{bookmark.title}</div>
                  <div className="flex flex-wrap text-gray-500 dark:text-gray-400">
                    <p className="line-clamp-2">{bookmark.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Masonry>
      <div ref={lastBookmarkRef}></div>
    </>
  )
}
