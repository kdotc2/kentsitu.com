'use client'
import { Loader } from '@/components/ui/skeleton'
import bookmarkItems from '@/content/bookmarkItems'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

type MetaData = {
  title: string
  description: string
  url: string
}

const metascraperUrl = process.env.NEXT_PUBLIC_API_URL

async function getMetadata(link: string): Promise<MetaData | null> {
  try {
    const res = await fetch(`${metascraperUrl}/api?url=https://${link}`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.error(`Failed to fetch metadata for ${link}:`, error)
    return null
  }
}

export default function Bookmarks() {
  const [page, setPage] = useState(1)
  const [bookmarks, setBookmarks] = useState<MetaData[]>([])
  const lastBookmarkRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  const randomList = useMemo(() => {
    const shuffledItems = [...bookmarkItems].sort(() => 0.5 - Math.random())
    return shuffledItems
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

  return (
    <>
      {bookmarks.map((bookmark) => (
        <Link
          key={bookmark.title}
          href={bookmark.url}
          className="cardStyle mb-4"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Link to ${bookmark.title}`}
        >
          <div className="w-full space-y-1.5 p-4 text-sm">
            <div className="flex items-center gap-2 font-bold">
              <div className="line-clamp-2 flex items-center justify-between w-full gap-2">
                {bookmark.title}{' '}
                <ArrowUpRight className="h-5 w-5 text-muted-foreground flex-shrink-0 self-start" />
              </div>
            </div>
            <div className="flex flex-wrap text-muted-foreground">
              <p className="line-clamp-3">{bookmark.description}</p>
            </div>
          </div>
        </Link>
      ))}

      <div ref={lastBookmarkRef}>{loading && <Loader />}</div>
    </>
  )
}
