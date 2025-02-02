/* eslint-disable @next/next/no-img-element */
'use client'
import { Loader } from '@/components/ui/skeleton'
import bookmarkItems from '@/content/bookmarkItems'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
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

async function getMetadata(link: string): Promise<MetaData | null> {
  try {
    const res = await fetch(
      `https://metainfo.vercel.app/api?url=https://${link}`
    )
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.error(`Failed to fetch metadata for ${link}:`, error)
    return null // Return null on error to signify failure
  }
}

export default function Bookmarks() {
  const [page, setPage] = useState(1)
  const [bookmarks, setBookmarks] = useState<MetaData[]>([])
  const lastBookmarkRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({})

  const randomList = useMemo(() => {
    return bookmarkItems
  }, [])

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
      setLoading(true)
      const data = await Promise.all(
        randomList.slice(0, page * 6).map((url) => getMetadata(url))
      )
      setBookmarks(data.filter((bookmark) => bookmark !== null) as MetaData[])
      setLoading(false)
    }

    fetchBookmarks()
  }, [page, randomList])

  const handleImageError = (title: string) => {
    setImageError((prev) => ({ ...prev, [title]: true }))
  }

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {bookmarks.map((bookmark) => (
          <Link
            key={bookmark.title}
            href={bookmark.url}
            className="cardStyle mb-4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Link to ${bookmark.title}`}
          >
            {imageError[bookmark.title] ? (
              <div className="w-full h-48 flex items-center justify-center border-b">
                No Image Found
              </div>
            ) : (
              <img
                className="relative flex-grow-0 border-b w-full"
                src={bookmark.image}
                alt={`${bookmark.title} Cover photo`}
                loading="lazy"
                onError={() => handleImageError(bookmark.title)}
              />
            )}
            <div className="w-full space-y-1.5 p-4 text-sm">
              <div className="flex items-center gap-2 font-bold">
                <div className="line-clamp-2">{bookmark.title}</div>
              </div>
              <div className="flex flex-wrap text-muted-foreground">
                <p className="line-clamp-3">{bookmark.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </Masonry>
      <div ref={lastBookmarkRef}>{loading && <Loader />}</div>
    </>
  )
}
