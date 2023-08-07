'use client'

import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import { NavigationLink } from './NavigationLink'
import NavigationItems from './NavigationItems'
import { AnimatePresence } from 'framer-motion'

function Sidebar() {
  const { sections } = NavigationItems()

  return (
    <div
      className={`sticky top-0 z-[40] hidden flex-shrink-0 flex-col overflow-y-auto bg-[#f2f2f2] dark:bg-[#121212] md:flex md:h-[calc(100vh)] lg:h-screen ${'w-[180px] lg:w-[240px]'}`}
    >
      <AnimatePresence>
        <div className="my-8 lg:my-12">
          <div className="mx-[32px] mb-2 flex justify-start">
            <Link href="/" aria-label="site title">
              <div className="font-semibold sm:block">Kent Situ</div>
            </Link>
          </div>
          <div>
            {sections.map((section, i) => {
              return (
                <ul className="mx-5 pt-6" key={i}>
                  {section.label && (
                    <div className="mb-2 ml-3 text-xs font-medium">{section.label}</div>
                  )}
                  {section.items.map((item, j) => (
                    <NavigationLink key={j} link={item} />
                  ))}
                </ul>
              )
            })}
          </div>
          <div>
            <ThemeSwitch />
          </div>
        </div>
      </AnimatePresence>
    </div>
  )
}

export default Sidebar
