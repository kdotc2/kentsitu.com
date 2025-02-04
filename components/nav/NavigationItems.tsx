'use client'

import {
  FolderClosed,
  Pencil,
  Bookmark,
  FileIcon,
  Code,
  Send,
  BriefcaseBusiness,
} from 'lucide-react'
import { allProjects, allWorks, allWritings } from 'contentlayer/generated'
import {
  sortedProjectsPost,
  sortedWorkPost,
  sortedWritingPost,
} from '@/lib/utils/contentlayer'
import { usePathname } from 'next/navigation'

export const ReadCv = () => (
  <div className="w-4 h-4">
    <svg
      width={16}
      height={16}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'scale(1.5)' }} // Scale the SVG content itself
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M75.452 51.1586C74.84 50.9944 74.2016 50.9524 73.5733 51.0349C72.945 51.1174 72.3391 51.3229 71.7902 51.6396C71.2413 51.9563 70.7601 52.378 70.3742 52.8806C69.9883 53.3832 69.7051 53.9569 69.5409 54.569C69.3767 55.1811 69.3347 55.8195 69.4172 56.4478C69.4997 57.0761 69.7052 57.6819 70.0219 58.2308C70.3386 58.7797 70.7603 59.2609 71.2629 59.6468C71.7655 60.0327 72.3392 60.3159 72.9513 60.4801L119.526 72.9515C120.146 73.1438 120.799 73.209 121.445 73.143C122.091 73.077 122.717 72.8812 123.285 72.5674C123.853 72.2536 124.352 71.8283 124.752 71.3169C125.152 70.8055 125.445 70.2186 125.613 69.5914C125.78 68.9642 125.819 68.3096 125.728 67.6668C125.636 67.0241 125.416 66.4064 125.08 65.851C124.744 65.2955 124.299 64.8135 123.772 64.4341C123.246 64.0547 122.648 63.7856 122.014 63.6429L75.4456 51.1715L75.452 51.1586ZM70.0456 71.3444C68.8254 71.055 67.5406 71.2525 66.4636 71.8948C65.3866 72.5371 64.6022 73.5738 64.2769 74.7848C63.9515 75.9958 64.1108 77.286 64.7209 78.3816C65.331 79.4771 66.344 80.2918 67.5449 80.6529L114.12 93.1372C115.356 93.468 116.673 93.2942 117.781 92.654C118.889 92.0138 119.697 90.9597 120.028 89.7236C120.358 88.4875 120.185 87.1707 119.544 86.0627C118.904 84.9548 117.85 84.1465 116.614 83.8158L70.0456 71.3444ZM58.7313 94.9308C59.0628 93.6968 59.8705 92.6449 60.977 92.006C62.0835 91.3672 63.3984 91.1937 64.6327 91.5236L95.6827 99.8422C96.2944 100.006 96.8677 100.289 97.3701 100.674C97.8725 101.059 98.2941 101.54 98.6108 102.088C98.9275 102.637 99.1331 103.242 99.2158 103.87C99.2986 104.497 99.2569 105.135 99.0931 105.747C98.9293 106.358 98.6467 106.932 98.2613 107.434C97.8759 107.937 97.3954 108.358 96.8471 108.675C96.2988 108.992 95.6935 109.197 95.0657 109.28C94.438 109.363 93.8001 109.321 93.1884 109.157L62.1384 100.839C61.5267 100.675 60.9534 100.392 60.4511 100.006C59.9488 99.6201 59.5274 99.1392 59.211 98.5906C58.8946 98.0419 58.6893 97.4363 58.607 96.8084C58.5247 96.1804 58.567 95.5424 58.7313 94.9308Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M106.072 154.202L43.978 137.571C39.4498 136.357 35.5894 133.394 33.2457 129.334C30.9021 125.273 30.2673 120.448 31.4808 115.92L52.2772 38.2949C53.4915 33.7667 56.4547 29.9063 60.515 27.5627C64.5753 25.2191 69.4003 24.5842 73.9287 25.7978L136.029 42.4285C140.557 43.6428 144.417 46.6059 146.761 50.6663C149.105 54.7266 149.739 59.5516 148.526 64.0799L127.723 141.698C126.509 146.227 123.546 150.087 119.485 152.431C115.425 154.774 110.6 155.416 106.072 154.202ZM40.7894 118.414C40.5162 119.434 40.4465 120.497 40.5843 121.543C40.722 122.589 41.0645 123.598 41.5923 124.512C42.12 125.426 42.8225 126.227 43.6599 126.87C44.4972 127.512 45.4528 127.983 46.4722 128.256L108.572 144.893C110.629 145.443 112.82 145.155 114.665 144.09C116.509 143.026 117.855 141.273 118.408 139.217L139.211 61.5856C139.484 60.5662 139.554 59.503 139.416 58.4567C139.278 57.4104 138.936 56.4014 138.408 55.4875C137.88 54.5735 137.178 53.7725 136.34 53.1301C135.503 52.4877 134.547 52.0165 133.528 51.7435L71.4215 35.0999C69.3637 34.5502 67.1717 34.8399 65.3274 35.9055C63.4831 36.9711 62.1373 38.7254 61.5858 40.7828L40.7894 118.414Z"
        fill="currentColor"
      />
    </svg>
  </div>
)

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
          icon: BriefcaseBusiness,
          isActive: pathname.startsWith('/work'),
        },
        {
          href: '/projects',
          title: 'Projects',
          icon: FolderClosed,
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
          href: 'https://read.cv/kent',
          title: 'Read.cv',
          icon: ReadCv,
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
