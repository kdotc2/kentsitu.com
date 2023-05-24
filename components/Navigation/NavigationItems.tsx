'use client'
import {
  FolderIcon,
  DocumentIcon,
  TvIcon,
  UserIcon,
  BookmarkIcon,
  CodeBracketIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'

const NavigationItems = () => {
  const pathname = usePathname()

  const sections = [
    {
      label: 'Designs',
      items: [
        {
          href: '/work',
          title: 'Work',
          icon: FolderIcon,
          isActive: pathname.startsWith('/work'),
        },
        {
          href: '/projects',
          title: 'Projects',
          icon: TvIcon,
          isActive: pathname.startsWith('/projects'),
        },
      ],
    },
    {
      label: 'Me',
      items: [
        {
          href: '/about',
          title: 'About',
          icon: UserIcon,
          isActive: pathname.startsWith('/about'),
        },
        {
          href: '/writing',
          title: 'Writing',
          icon: PencilIcon,
          isActive: pathname.startsWith('/writing'),
        },
        {
          href: '/bookmarks',
          title: 'Bookmarks',
          icon: BookmarkIcon,
          isActive: pathname.startsWith('/bookmarks'),
        },
      ],
    },
    {
      label: 'Miscellaneous',
      items: [
        {
          href: '/changelog',
          title: 'Changelog',
          icon: DocumentIcon,
          isActive: pathname.startsWith('/changelog'),
        },
        {
          href: '/snippets',
          title: 'Snippets',
          icon: CodeBracketIcon,
          isActive: pathname.startsWith('/snippets'),
        },
      ],
    },
  ]

  return {
    sections,
  }
}

export default NavigationItems
