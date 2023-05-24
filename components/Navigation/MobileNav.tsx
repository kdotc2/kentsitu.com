'use client'
import { useState } from 'react'
import Link from 'next/link'
import { NavigationLink } from './NavigationLink'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid'
import NavigationItems from './NavigationItems'
import ThemeSwitch from 'components/ThemeSwitch'

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
      <Link href="/" aria-label="site title">
        <div className="font-semibold sm:block">Kent Situ</div>
      </Link>
      <div className="flex">
        <button type="button" aria-label="Toggle Menu" onClick={onToggleNav}>
          {navShow ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      <div
        className={`fixed left-0 right-0 top-0 mt-16 w-full transform overflow-y-auto bg-gray-100/[0.97] pb-10 duration-300 ease-in-out supports-[height:100dvh]:h-[calc(100dvh-64px)] dark:bg-[#212121]/[0.98] ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {sections.map((section, i) => {
            return (
              <ul className="mx-6 pt-6" key={i}>
                {section.label && (
                  <div className="mb-2 ml-3 text-xs font-medium">{section.label}</div>
                )}
                {section.items.map((item, j) => (
                  <button key={j} onClick={onToggleNav} className="w-full text-left">
                    <NavigationLink link={item} />
                  </button>
                ))}
              </ul>
            )
          })}
        </div>
        <div className="mx-1 cursor-pointer">
          <ThemeSwitch onToggleNav={onToggleNav} />
        </div>
      </div>
    </div>
  )
}

export default MobileNav
