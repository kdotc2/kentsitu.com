'use client'
import type { TableOfContents } from '@/lib/toc'
import { List } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { SidebarMenuButton } from '@/components/ui/sidebar'

export interface TocProps {
  toc: TableOfContents
}

export function TableOfContents({ toc }: TocProps) {
  const [tocShow, setTocShow] = useState(true)

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
    <div className={cn('ml-5', `${tocShow ? ' ml-[104px]' : 'flex absolute'}`)}>
      <div className="relative flex items-center gap-4 px-0.5">
        {tocShow && <p className="w-[100px] font-semibold">On This Page</p>}
        <div className="group">
          <SidebarMenuButton
            tooltip={tocShow ? 'Hide ToC' : 'Table of Contents'}
            size="icon"
            variant="outline"
            onClick={onToggleToc}
            className="rounded-full"
            showTooltip
          >
            <List className="h-5 w-5" />
          </SidebarMenuButton>
        </div>
      </div>

      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          'overflow-hidden w-[220px] space-y-4',
          tocShow
            ? 'opacity-100 translate-y-0' // On open, fully visible and in place
            : 'opacity-0 translate-y-[-16px]' // On close, fading out and sliding up
        )}
      >
        {tocShow && ( // Ensure this is only rendered when tocShow is true
          <div className="max-h-[calc(80vh-64px)] overflow-y-auto pr-4 mt-1 p-0.5">
            <Tree tree={toc} activeItem={activeHeading} />
          </div>
        )}
      </div>
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
    <ul>
      {tree.items.map((item, index) => {
        const isActive = item.url === `#${activeItem}`
        return (
          <li
            key={index}
            className={cn(
              isActive && 'border-l-primary',
              level !== 1 && 'pl-4 border-l ml-1 group hover:border-l-primary'
            )}
          >
            <a
              href={item.url}
              className={cn(
                'inline-block hover:text-primary py-1',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground/50 group-hover:text-primary'
              )}
            >
              {item.title}
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
