import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
  section: string
  isActive: boolean
  posts: any
}

export default function AnimateSection({ section, posts, isActive }: Props) {
  const pathname = usePathname()
  return (
    <AnimatePresence initial={false}>
      {isActive && pathname.startsWith(`/${section}`) && (
        <>
          {posts.map((post: { slug: any; title: any }) => {
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
                    'hover:dark:text-gray-10 mx-5 truncate border-l border-l-gray-300 px-6 py-[6px] text-gray-400 hover:border-l hover:border-l-gray-800 hover:text-gray-900 dark:border-l-gray-700 dark:text-gray-600 hover:dark:border-l-gray-200',
                    `${
                      pathname.endsWith(`${slug}`) &&
                      'border-l border-l-gray-800 dark:border-l-gray-200'
                    }`
                  )}
                >
                  <Link
                    href={`/${section}/${slug}`}
                    aria-label={`Link to ${title}`}
                  >
                    <div
                      className={`${
                        pathname.endsWith(`${slug}`) &&
                        'text-gray-900 dark:text-gray-100'
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
