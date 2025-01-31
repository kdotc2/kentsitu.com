'use client'

import {
  FolderClosed,
  TvMinimal,
  Pencil,
  Bookmark,
  FileIcon,
  Code,
  FileText,
  Send,
} from 'lucide-react'
import { allProjects, allWorks, allWritings } from 'contentlayer/generated'
import {
  sortedProjectsPost,
  sortedWorkPost,
  sortedWritingPost,
} from '@/lib/utils/contentlayer'
import { usePathname } from 'next/navigation'

const NavigationItems = () => {
  const pathname = usePathname()

  // Define collapsible sections (e.g., Work, Projects, Writing)
  const collapsibleSections = [
    {
      label: 'Work',
      posts: sortedWorkPost(allWorks.filter((post) => !post.draft)), // Exclude drafts
      basePath: '/work',
    },
    {
      label: 'Projects',
      posts: sortedProjectsPost(allProjects.filter((post) => !post.draft)), // Exclude drafts
      basePath: '/projects',
    },
    {
      label: 'Writing',
      posts: sortedWritingPost(allWritings.filter((post) => !post.draft)), // Exclude drafts
      basePath: '/writing',
    },
  ]

  const sections = [
    {
      label: 'Content',
      items: [
        {
          href: '/work',
          title: 'Work',
          icon: FolderClosed,
          isActive: pathname.startsWith('/work'),
        },
        {
          href: '/projects',
          title: 'Projects',
          icon: TvMinimal,
          isActive: pathname.startsWith('/projects'),
        },
        {
          href: '/writing',
          title: 'Writing',
          icon: Pencil,
          isActive: pathname.startsWith('/writing'),
        },
      ],
    },
    {
      label: 'Miscellaneous',
      items: [
        {
          href: '/bookmarks',
          title: 'Bookmarks',
          icon: Bookmark,
          isActive: pathname.startsWith('/bookmarks'),
        },
        {
          href: '/changelog',
          title: 'Changelog',
          icon: FileIcon,
          isActive: pathname.startsWith('/changelog'),
        },
        {
          href: '/snippets',
          title: 'Snippets',
          icon: Code,
          isActive: pathname.startsWith('/snippets'),
        },
      ],
    },
    {
      label: 'Me',
      items: [
        {
          href: '/Kent_Situ_Resume.pdf',
          title: 'Resume',
          icon: FileText,
        },
        {
          href: 'mailto:hello@kentsitu.com',
          title: 'Contact',
          icon: Send,
        },
      ],
    },
  ]
  return {
    sections,
    collapsibleSections,
  }
}

export default NavigationItems
