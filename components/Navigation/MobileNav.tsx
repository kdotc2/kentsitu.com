'use client'
import { useState } from 'react'
import Link from 'next/link'
import { NavigationLink } from './NavigationLink'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid'
import NavigationItems from './NavigationItems'
import ThemeSwitch from '@components/Navigation/ThemeSwitch'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const { sections } = NavigationItems()

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="absolute z-40 flex w-full items-center justify-between p-5 md:hidden">
      <header className="font-semibold sm:block">
        <Link href="/">Kent Situ</Link>
      </header>
      <div className="flex">
        <button type="button" aria-label="Toggle Menu" onClick={onToggleNav}>
          {navShow ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      <nav
        className={`fixed left-0 right-0 top-0 mt-16 w-full transform overflow-y-auto bg-[#f2f2f2] pb-10 duration-300 ease-in-out supports-[height:100dvh]:h-[calc(100dvh-64px)] dark:bg-[#121212] ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <>
          {sections.map((section, i) => {
            return (
              <div key={i}>
                {section.label && (
                  <h4 className="mb-2 ml-9 pt-6 text-xs font-medium">{section.label}</h4>
                )}
                <ul className="mx-6">
                  {section.items.map((item, j) => (
                    <li className="text-[13px]" key={j}>
                      <button onClick={onToggleNav} className="w-full text-left">
                        <NavigationLink link={item} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
          <div className="mx-1 cursor-pointer">
            <ThemeSwitch onToggleNav={onToggleNav} />
          </div>
        </>
      </nav>
    </div>
  )
}

export default MobileNav
