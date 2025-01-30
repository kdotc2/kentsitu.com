'use client'

import { useEffect, useState } from 'react'
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

// Utility function to format titles
const formatTitle = (text: string) => {
  if (text === 'ylli') {
    return 'YLLI'
  } else
    return text
      .split('-') // Split words by hyphens
      .map((word) => {
        if (word.length <= 3) {
          return word.toLowerCase() // Lowercase words with 3 letters or less
        }
        return word.charAt(0).toUpperCase() + word.slice(1) // Capitalize longer words
      })
      .join(' ') // Join back with spaces
}

export const Header = () => {
  const pathname = usePathname() // Get the current pathname
  const router = useRouter()

  // Initialize state with formatted pathname
  const [activeContent, setActiveContent] = useState(() => {
    const pathParts = pathname.split('/').filter(Boolean)
    return pathParts.length > 0 ? formatTitle(pathParts[0]) : ''
  })

  const [activeTitle, setSelectedTitle] = useState(() => {
    const pathParts = pathname.split('/').filter(Boolean)
    return pathParts.length > 1
      ? pathParts.slice(1).map(formatTitle).join(' > ')
      : ''
  })

  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean)
    setActiveContent(pathParts.length > 0 ? formatTitle(pathParts[0]) : '')
    setSelectedTitle(
      pathParts.length > 1
        ? pathParts.slice(1).map(formatTitle).join(' > ')
        : ''
    )
  }, [pathname])

  const handleTitleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedTitle('')
    router.push(`/${activeContent.toLowerCase()}`)
  }

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedTitle('')
    setActiveContent('')
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
