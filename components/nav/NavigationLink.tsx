'use client'

import Link from 'next/link'
import {
  LucideIcon,
  ChevronRight,
  LucideProps,
  Copy,
  ExternalLink,
} from 'lucide-react'
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
import { ComponentType } from 'react'
import { toast } from 'sonner'

export type NavProps = {
  link: {
    href: string
    title: string
    icon: LucideIcon | ComponentType<LucideProps>
    isActive?: boolean
  }
  className?: string
}

export function NavigationLink({ link, className }: NavProps) {
  const { setOpenMobile, isMobile } = useSidebar()
  // const Icon = link.icon
  const pathname = usePathname()

  const { collapsibleSections } = NavigationItems()

  const onCopy = async () => {
    if (link.title === 'Contact') {
      const contactInfo = link.href
      await navigator.clipboard.writeText(contactInfo)

      // Show the toast notification after copying
      toast('Email copied to clipboard', {
        description: link.href,
      })
    }
  }

  return (
    <div className={className}>
      {/* Collapsible Sections */}
      {collapsibleSections.map(({ label, posts, basePath }) =>
        link.title === label ? (
          <Collapsible
            key={label}
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
              {posts.map((post) => (
                <SidebarMenuSub
                  key={post.slug}
                  isActive={pathname.endsWith(`${post.slug}`)}
                >
                  <Link
                    href={`${basePath}/${post.slug}`}
                    className={cn('block px-2 py-1')}
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
        <SidebarMenuButton
          tooltip={link.title}
          isActive={link.isActive}
          as={link.title === 'Contact' ? 'button' : Link}
          href={link.title === 'Contact' ? undefined : link.href}
          target={
            link.title === 'Read.cv' || link.title === 'Github'
              ? '_blank'
              : '_self'
          }
          className="group-data-[state=collapsed]:mx-2"
          onClick={
            link.title === 'Contact' ? onCopy : () => setOpenMobile(false)
          }
        >
          <link.icon />
          <span>{link.title}</span>
          {link.title === 'Contact' ? (
            <Copy className="ml-auto text-muted-foreground" />
          ) : link.title === 'Read.cv' || link.title === 'Github' ? (
            <ExternalLink className="ml-auto text-muted-foreground" />
          ) : null}
        </SidebarMenuButton>
      )}
    </div>
  )
}
