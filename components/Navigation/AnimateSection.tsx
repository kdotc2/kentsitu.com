import clsx from 'clsx'
import { Projects, Work } from 'contentlayer/generated'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
  section: string
  isActive: boolean
  posts: Work[] | Projects[]
}

export default function AnimateSection({ section, posts, isActive }: Props) {
  const pathname = usePathname()
  return (
    <AnimatePresence initial={false}>
      {isActive && pathname.startsWith(`/${section}`) && (
        <>
          {posts.map((post: { slug: string; title: string }) => {
            const { slug, title } = post
            return (
              <motion.div
                key={title}
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
              >
                <motion.div
                  variants={{
                    collapsed: { height: 'auto' },
                  }}
                  layout
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className={clsx(
                    'ml-5 py-[6px] pl-6',
                    `${
                      pathname.endsWith(`${slug}`)
                        ? 'border-l border-l-gray-800 dark:border-l-gray-200'
                        : 'border-l border-l-gray-300 text-gray-400 hover:border-l hover:border-l-gray-800 hover:text-gray-800 dark:border-l-gray-700 dark:text-gray-600 hover:dark:border-l-gray-200 hover:dark:text-gray-200'
                    }`
                  )}
                >
                  <Link href={`/${section}/${slug}`} aria-label={`Link to ${title}`}>
                    <div
                      className={`truncate ${
                        pathname.endsWith(`${slug}`) && 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {title}
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            )
          })}
        </>
      )}
    </AnimatePresence>
  )
}
