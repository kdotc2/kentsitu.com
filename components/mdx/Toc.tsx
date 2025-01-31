'use client'
import type { TableOfContents } from '@/lib/toc'
import { List } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { SidebarMenuButton } from '@/components/ui/sidebar'

interface TocProps {
  toc: TableOfContents
}

export function TableOfContents({ toc }: TocProps) {
  const [tocShow, setTocShow] = useState(false)

  const onToggleToc = () => {
    setTocShow((status) => !status)
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
    <div className={clsx(`${tocShow ? ' ml-[104px]' : 'flex'}`, 'ml-5 pt-4')}>
      <div className="relative flex items-center gap-4">
        {tocShow && <p className="w-[100px] font-semibold">On This Page</p>}
        <div className="group">
          <SidebarMenuButton
            tooltip={'Table of Contents'}
            size="icon"
            variant="outline"
            onClick={onToggleToc}
            className="rounded-full"
            showTooltip={!tocShow}
          >
            <List className="h-5 w-5" />
          </SidebarMenuButton>
        </div>
      </div>

      {tocShow && (
        <div className="w-[200px] space-y-4">
          <Tree tree={toc} activeItem={activeHeading} />
        </div>
      )}
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
                item.url === `#${activeItem}` &&
                  'text-gray-800 dark:text-gray-200'
              )}
            >
              <div
                className={cn(
                  { 'py-1': level === 1 },
                  {
                    'ml-1 border-l border-l-gray-300 py-1 pl-4 hover:border-l-gray-800 hover:text-gray-800 dark:border-l-gray-700 hover:dark:border-l-gray-200 hover:dark:text-gray-200':
                      level !== 1,
                  },
                  item.url === `#${activeItem}` &&
                    'border-l-gray-800 dark:border-l-gray-200'
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
