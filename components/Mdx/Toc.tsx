'use client'
import * as React from 'react'
import { TableOfContents } from '@lib/remark-toc-headings'
import { cn } from '@lib/utils/utils'

interface TocProps {
  toc: TableOfContents
}

function useMounted() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

export function TableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
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
  const mounted = useMounted()

  if (!toc?.items) {
    return null
  }

  return mounted ? (
    <div className="m-0.5 space-y-4">
      <p className="font-semibold">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  ) : null
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>('')

  React.useEffect(() => {
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
