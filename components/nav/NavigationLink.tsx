'use client'

import Link from 'next/link'
import { ChevronRight, ArrowUpRight, LucideIcon } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuSub,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import NavigationItems from '@/components/nav/NavigationItems'

export type NavProps = {
  link: {
    href: string
    title: string
    icon: LucideIcon
    isActive?: boolean
  }
  className?: string
}

export function NavigationLink({ link, className }: NavProps) {
  const { setOpenMobile } = useSidebar()
  // const Icon = link.icon
  const pathname = usePathname()

  const { collapsibleSections } = NavigationItems()

  return (
    <div className={className}>
      {/* Collapsible Sections */}
      {collapsibleSections.map(({ label, posts, basePath }) =>
        link.title === label ? (
          <Collapsible
            key={label}
            // open={link.isActive}
            className="group/collapsible"
          >
            {/* Link as the Collapsible Trigger */}
            <CollapsibleTrigger asChild>
              {/* <Link
                href={link.href}
                className={`flex items-center justify-between rounded-md px-3 py-[6px] ${
                  link.isActive
                    ? 'bg-gray-200 dark:bg-gray-800 dark:text-gray-100'
                    : 'sm:hover:bg-gray-200 sm:hover:dark:bg-gray-800'
                }`}
              >
                <Flex className="items-center gap-[10px]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {link.title}
                </Flex>
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </Link> */}
              <Link
                href={link.href}
                className={`flex items-center justify-between rounded-md group-data-[state=collapsed]:mx-2 group-data-[state=expanded]:px-1 group-data-[state=expanded]:-mx-1`}
              >
                <SidebarMenuButton
                  tooltip={link.title}
                  as="div"
                  isActive={link.isActive}
                >
                  <link.icon />
                  <span>{link.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </Link>
            </CollapsibleTrigger>

            {/* Collapsible Content */}
            <CollapsibleContent className="pl-1 overflow-hidden transition-[height] duration-300 ease-in-out data-[state=open]:animate-expand data-[state=closed]:animate-collapse">
              {posts.map((post) => (
                <SidebarMenuSub
                  key={post.slug}
                  isActive={pathname.endsWith(`${post.slug}`)}
                >
                  <Link
                    href={`${basePath}/${post.slug}`}
                    className={cn(
                      'block px-2 py-1 '
                      // `${
                      //   pathname.endsWith(`${post.slug}`)
                      //     ? ''
                      //     : 'text-gray-400  dark:text-gray-600 sm:hover:text-gray-800 sm:hover:dark:text-gray-200'
                      // }`
                    )}
                    onClick={() => setOpenMobile(false)}
                  >
                    {post.title}
                  </Link>
                </SidebarMenuSub>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ) : null
      )}

      {/* Regular Navigation Links */}
      {!collapsibleSections.some(({ label }) => link.title === label) && (
        // <Link
        //   target={
        //     link.title === 'Resume' || link.title === 'Contact'
        //       ? '_blank'
        //       : '_self'
        //   }
        //   href={link.href}
        //   className={`flex items-center justify-between gap-[10px] rounded-md px-3 py-[6px] ${
        //     link.isActive
        //       ? 'bg-gray-200 dark:bg-gray-800 dark:text-gray-100'
        //       : 'sm:hover:bg-gray-200 sm:hover:dark:bg-gray-800'
        //   }`}
        //   onClick={() => setOpenMobile(false)}
        // >
        //   <Flex className="items-center gap-[10px]">
        //     <Icon className="h-4 w-4" aria-hidden="true" />
        //     {link.title}
        //   </Flex>
        //   {(link.title === 'Resume' || link.title === 'Contact') && (
        //     <ArrowUpRight className="h-4 w-4" />
        //   )}
        // </Link>
        <Link
          target={
            link.title === 'Resume' || link.title === 'Contact'
              ? '_blank'
              : '_self'
          }
          href={link.href}
          className={`flex items-center justify-between rounded-md group-data-[state=collapsed]:mx-2 group-data-[state=expanded]:px-1 group-data-[state=expanded]:-mx-1 ${
            link.isActive
              ? 'bg-gray-200 dark:bg-gray-800 dark:text-gray-100'
              : 'sm:hover:bg-gray-200 sm:hover:dark:bg-gray-800'
          }`}
          onClick={() => setOpenMobile(false)}
        >
          <SidebarMenuButton tooltip={link.title}>
            <link.icon />
            <span>{link.title}</span>
            {(link.title === 'Resume' || link.title === 'Contact') && (
              <ArrowUpRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            )}
          </SidebarMenuButton>
        </Link>
      )}
    </div>
  )
}
