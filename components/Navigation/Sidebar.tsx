'use client'

import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import { NavigationLink } from './NavigationLink'
import NavigationItems from './NavigationItems'
import { AnimatePresence } from 'framer-motion'

function Sidebar() {
  const { sections } = NavigationItems()

  return (
    <nav
      className={`sticky top-0 z-[40] hidden flex-shrink-0 flex-col overflow-y-auto bg-[#f2f2f2] dark:bg-[#121212] md:flex md:h-[calc(100vh)] lg:h-screen ${'w-[180px] lg:w-[240px]'}`}
    >
      <AnimatePresence>
        <div className="my-8 lg:my-12">
          <header className="mx-[32px] mb-2 flex justify-start font-semibold sm:block">
            <Link href="/">Kent Situ</Link>
          </header>
          <>
            {sections.map((section, i) => {
              return (
                <div key={i}>
                  {section.label && (
                    <h4 className="mb-2 ml-8 pt-6 text-xs font-medium">{section.label}</h4>
                  )}
                  <ul className="mx-5">
                    {section.items.map((item, j) => (
                      <li className="text-[13px]" key={j}>
                        <NavigationLink link={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
            <div>
              <ThemeSwitch />
            </div>
          </>
        </div>
      </AnimatePresence>
    </nav>
  )
}

export default Sidebar
