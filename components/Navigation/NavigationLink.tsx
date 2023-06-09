import CodeBracketIcon from '@heroicons/react/24/outline/CodeBracketIcon'
import Link from 'next/link'
import { allProjects, allWorks } from 'contentlayer/generated'
import { sortedProjectsPost, sortedWorkPost } from '@lib/utils/contentlayer'
import AnimateSection from '@components/Navigation/AnimateSection'

export type NavProps = {
  link: {
    href: string
    title: string
    icon: typeof CodeBracketIcon
    isActive: boolean
  }
}

export function NavigationLink({ link }: NavProps) {
  const Icon = link.icon
  const workPosts = sortedWorkPost(allWorks)
  const projectPosts = sortedProjectsPost(allProjects)

  return (
    <>
      <li className="text-[13px]">
        <Link
          href={link.href}
          aria-label={link.href}
          className={`my-0.5 flex items-center gap-[10px] rounded-md px-3 py-[6px] ${
            link.isActive
              ? 'rounded-md bg-gray-200 px-2 py-2 dark:bg-gray-800 dark:text-white'
              : 'sm:hover:rounded-md sm:hover:bg-gray-200 sm:hover:dark:bg-gray-800'
          }`}
        >
          <Icon className="h-4 w-4" />
          {link.title}
        </Link>
        <AnimateSection section={'work'} isActive={link.isActive} posts={workPosts} />
        <AnimateSection section={'projects'} isActive={link.isActive} posts={projectPosts} />
      </li>
    </>
  )
}
