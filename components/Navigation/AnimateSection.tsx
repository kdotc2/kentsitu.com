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
          {posts.map((post) => {
            const { slug, title, draft } = post
            return (
              !draft && (
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
                  <Link href={`/${section}/${slug}`}>
                    <motion.div
                      variants={{
                        collapsed: { height: 'auto' },
                      }}
                      layout
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      className={clsx(
                        'ml-5 mr-0.5 py-[6px] pl-[17px]',
                        `${
                          pathname.endsWith(`${slug}`)
                            ? 'border-l border-l-gray-800 dark:border-l-gray-200'
                            : 'border-l border-l-gray-300 text-gray-400 hover:border-l dark:border-l-gray-700 dark:text-gray-600 sm:hover:border-l-gray-800 sm:hover:text-gray-800 sm:hover:dark:border-l-gray-200 sm:hover:dark:text-gray-200'
                        }`
                      )}
                    >
                      <div
                        className={`truncate ${
                          pathname.endsWith(`${slug}`) && 'text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        {title}
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            )
          })}
        </>
      )}
    </AnimatePresence>
  )
}
