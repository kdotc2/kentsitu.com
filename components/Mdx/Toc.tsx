'use client'
import { TableOfContents } from '@lib/remark-toc-headings'
import { ListBulletIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@lib/utils/utils'
import clsx from 'clsx'

interface TocProps {
  toc: TableOfContents
}

export function TableOfContents({ toc }: TocProps) {
  const [tocShow, setTocShow] = useState(false)
  const [tooltipStatus, setTooltipStatus] = useState(false)

  const onToggleToc = () => {
    setTooltipStatus(false)
    setTocShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  const itemIds = useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1])
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)

  if (!toc?.items) {
    return null
  }

  return (
    <div
      className={clsx(`${tocShow ? ' ml-[104px]' : 'absolute flex'}`, 'ml-5 pt-4')}
      onMouseEnter={() => setTooltipStatus(true)}
      onMouseLeave={() => setTooltipStatus(false)}
    >
      <div className="relative flex items-center gap-4">
        {tocShow && <p className="w-[100px] font-semibold">On This Page</p>}
        <div className="group">
          <button
            aria-label="Table of Contents"
            className="flex items-center justify-center rounded-full border border-gray-200 bg-[#f2f2f2] p-2.5 text-gray-900 active:scale-95 active:border-gray-300 active:bg-[#ebebeb] md:hover:border-gray-300 md:hover:bg-[#ebebeb] dark:border-gray-700 dark:bg-[#121212] dark:text-gray-100 active:dark:border-gray-600 active:dark:bg-[#191919] md:hover:dark:border-gray-600 md:hover:dark:bg-[#191919]"
            onClick={onToggleToc}
          >
            <ListBulletIcon className="h-5 w-5" />
          </button>
          {tooltipStatus && (
            <>
              {!tocShow && (
                <span className="absolute right-12 top-[5px] whitespace-nowrap rounded-md bg-[#ebebeb] px-2 py-2 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-95 dark:bg-[#191919]">
                  Table of Contents
                </span>
              )}
            </>
          )}
        </div>
      </div>
      <>
        {tocShow && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            initial={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="w-[200px] space-y-4">
              <Tree tree={toc} activeItem={activeHeading} />
            </div>
          </motion.div>
        )}
      </>
    </div>
  )
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -90% 0%` }
    )

    itemIds?.forEach((id) => {
      if (!id) {
        return
      }

      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return
        }

        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string | null
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className="">
      {tree.items.map((item, index) => {
        return (
          <li key={index}>
            <a
              href={item.url}
              className={cn(
                'text-gray-400 no-underline hover:text-gray-800 dark:text-gray-600 hover:dark:text-gray-200',
                item.url === `#${activeItem}` && 'text-gray-800 dark:text-gray-200'
              )}
            >
              <div
                className={cn(
                  { 'py-1': level === 1 },
                  {
                    'ml-1 border-l border-l-gray-300 py-1 pl-4 hover:border-l-gray-800 hover:text-gray-800 dark:border-l-gray-700 hover:dark:border-l-gray-200 hover:dark:text-gray-200':
                      level !== 1,
                  },
                  item.url === `#${activeItem}` && 'border-l-gray-800 dark:border-l-gray-200'
                )}
              >
                {item.title}
              </div>
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
