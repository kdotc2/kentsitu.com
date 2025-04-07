'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { ThemeSwitch } from '@/components/nav/ThemeSwitch'
import { NavigationLink } from '@/components/nav/NavigationLink'
import NavigationItems from '@/components/nav/NavigationItems'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sections } = NavigationItems()

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Sidebar Header */}
      <SidebarHeader className="h-16 border-b flex justify-center font-semibold">
        <SidebarMenuButton
          size="lg"
          variant="none"
          className="w-fit group-data-[state=collapsed]:mx-2 text-primary"
          as={Link}
          href={'/'}
        >
          {/* Logo Container */}
          <div className="aspect-square size-8 flex items-center justify-center group-data-[state=expanded]:hidden max-md:hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M55.5049 46.5825C60.165 54.4272 64.2816 62.8932 69.9515 70.0388C73.1359 74.1554 75.7767 78.2718 80.9806 79.5922C79.1166 87.4369 75.3884 89.9223 69.5631 89.9223C65.9903 89.9223 60.9418 87.6699 58.301 84.3301C50.6117 74 44.6311 63.1262 38.1068 51.165V90H31.3495C23.2719 90 19 85.6505 19 78.1942V10.1553H25.2136C33.2913 10.1553 38.3399 14.2718 38.3399 21.8058V43.398C43.8544 33.767 49.6796 24.835 56.2815 15.8252C59.6214 11.165 62.6505 10 68.0874 10H81.2136C81.136 10.1553 62.0291 35.8641 55.5049 46.5825Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Text */}
          <span className="truncate text-base font-semibold opacity-100 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:w-0">
            Kent Situ
          </span>
        </SidebarMenuButton>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="text-sm pt-2">
        {sections.map((section) => (
          <SidebarGroup key={section.label}>
            {/* Section Label */}
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>

            {section.items.map((item) => (
              <NavigationLink key={item.title} link={item} />
            ))}
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <ThemeSwitch />
      </SidebarFooter>

      {/* Sidebar Rail (Optional) */}
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
