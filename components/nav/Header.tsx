'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Clock } from '@/components/nav/Clock'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// Special title mappings for known paths
const titleMappings: Record<string, string> = {
  ylli: 'YLLI',
  'portfolio-update-2': 'Portfolio Update 2.0',
  // Add more mappings here
}

// Utility function to format titles
const formatTitle = (text: string) => {
  // Return pre-defined title if it exists
  if (titleMappings[text]) {
    return titleMappings[text]
  }

  return text
    .split('-')
    .map((word) =>
      word.length <= 3
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ')
}

export const Header = () => {
  const pathname = usePathname()

  const slugPath = pathname.split('/').filter(Boolean)
  const activeContent = slugPath.length > 0 ? formatTitle(slugPath[0]) : ''
  const activeTitle =
    slugPath.length > 1 ? slugPath.slice(1).map(formatTitle).join(' > ') : ''

  return (
    <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-sidebar z-50">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center justify-between w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem
              className={cn(
                !activeContent && !activeTitle
                  ? 'text-primary'
                  : 'text-muted-foreground/50',
                'cursor-pointer'
              )}
            >
              <BreadcrumbLink as={Link} href={'/'}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className={cn(!activeContent && 'hidden')} />
            <BreadcrumbItem
              className={cn(
                activeContent && !activeTitle
                  ? 'text-primary'
                  : 'text-muted-foreground/50',
                'cursor-pointer'
              )}
            >
              <BreadcrumbLink
                className={cn(!activeContent && 'hidden')}
                as={Link}
                href={`/${slugPath[0]}`}
              >
                {activeContent}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className={cn(!activeTitle && 'hidden')} />
            <BreadcrumbItem
              className={cn(!activeTitle && 'hidden', 'truncate flex-1')}
            >
              <BreadcrumbPage className="truncate">
                {activeTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Clock />
      </div>
    </div>
  )
}
