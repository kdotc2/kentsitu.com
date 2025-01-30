'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Flex } from '@/components/ui/flex'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Clock } from '@/components/Clock'
import { cn } from '@/lib/utils'

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
  const router = useRouter()

  const pathParts = pathname.split('/').filter(Boolean)
  const activeContent = pathParts.length > 0 ? formatTitle(pathParts[0]) : ''
  const activeTitle =
    pathParts.length > 1 ? pathParts.slice(1).map(formatTitle).join(' > ') : ''

  const handleTitleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/${activeContent.toLowerCase()}`)
  }

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <Flex className="h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-sidebar z-50">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Flex justify="between" align="center" className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem
              className={cn(
                !activeContent && !activeTitle
                  ? 'text-black dark:text-white'
                  : '',
                'cursor-pointer'
              )}
            >
              <BreadcrumbLink onClick={handleHomeClick}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            {activeContent && <BreadcrumbSeparator />}
            <BreadcrumbItem
              className={cn(
                activeContent && !activeTitle
                  ? 'text-black dark:text-white'
                  : '',
                'cursor-pointer'
              )}
            >
              <BreadcrumbLink onClick={handleTitleClick}>
                {activeContent}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {activeTitle && <BreadcrumbSeparator />}
            <BreadcrumbItem className="truncate flex-1">
              <BreadcrumbPage className="truncate">
                {activeTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Clock />
      </Flex>
    </Flex>
  )
}
