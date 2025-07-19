'use client'

import Link from 'next/link'
import {
  LucideIcon,
  ChevronRight,
  LucideProps,
  Copy,
  ExternalLink,
  Check,
} from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import NavigationItems from '@/components/nav/NavigationItems'
import { ComponentType, useCallback, useState } from 'react'

export type NavProps = {
  link: {
    href: string
    title: string
    icon: LucideIcon | ComponentType<LucideProps>
    isActive?: boolean
  }
}

export function NavigationLink({ link }: NavProps) {
  const { setOpenMobile, isMobile, state } = useSidebar()
  const pathname = usePathname()
  const { collapsibleSections } = NavigationItems()
  const [copied, setCopied] = useState(false)

  const isCollapsibleSection = collapsibleSections.some(
    ({ label }) => link.title === label
  )

  const onCopy = useCallback(async () => {
    if (link.title === 'Contact') {
      await navigator.clipboard.writeText(link.href)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [link.href, link.title])

  return (
    <>
      {/* Collapsible Sections */}
      {collapsibleSections.map(({ label, posts, basePath }) =>
        link.title === label ? (
          <SidebarMenuItem key={label}>
            <Collapsible
              open={isMobile ? link.isActive : undefined}
              className="group/collapsible"
            >
              {/* Link as the Collapsible Trigger */}
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={link.title}
                  isActive={link.isActive}
                  as={Link}
                  href={link.href}
                  className="group-data-[state=collapsed]:mx-2"
                >
                  <link.icon />
                  <span>{link.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-muted-foreground" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              {/* Collapsible Content */}
              <CollapsibleContent className="pl-1 overflow-hidden transition-[height] duration-300 ease-in-out data-[state=open]:animate-expand data-[state=closed]:animate-collapse data-[state=open]:truncate">
                <SidebarMenuSub>
                  {posts.map((post) => (
                    <SidebarMenuSubItem key={post.slug}>
                      <SidebarMenuSubButton
                        as={Link}
                        href={`${basePath}/${post.slug}`}
                        isActive={pathname.endsWith(`${post.slug}`)}
                        onClick={() =>
                          setTimeout(() => {
                            setOpenMobile(false)
                          }, 300)
                        }
                      >
                        {post.title}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
        ) : null
      )}

      {/* Regular Navigation Links */}
      {!isCollapsibleSection && (
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={link.title}
            isActive={link.isActive}
            as={link.title === 'Contact' ? 'button' : 'a'}
            href={link.title === 'Contact' ? undefined : link.href}
            target={link.title === 'Github' ? '_blank' : '_self'}
            className="group-data-[state=collapsed]:mx-2"
            onClick={
              link.title === 'Contact'
                ? onCopy
                : link.title === 'Github'
                ? undefined
                : () => setOpenMobile(false)
            }
          >
            {/* In collapsed state and contact clicked, show Check as main icon */}
            {link.title === 'Contact' && state === 'collapsed' && copied ? (
              <Check />
            ) : (
              <link.icon />
            )}
            <span>{link.title}</span>
            {link.title === 'Contact' ? (
              copied ? (
                <Check className="ml-auto text-muted-foreground" />
              ) : (
                <Copy className="ml-auto text-muted-foreground" />
              )
            ) : link.title === 'Github' ? (
              <ExternalLink className="ml-auto text-muted-foreground" />
            ) : null}
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </>
  )
}
