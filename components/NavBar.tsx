import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ThemeSwitch from './ThemeSwitch'

function ScrollToTop() {
  const [atTop, setTop] = useState(true)
  useEffect(() => {
    function onScroll() {
      setTop(window.scrollY <= 0)
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return atTop
}

const NavBar = () => {
  const router = useRouter()
  const isTop = ScrollToTop()

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-40 ${
          isTop
            ? 'border-none bg-[#FBFBFB] dark:bg-gray-900'
            : 'border-b shadow-sm border-gray-200 bg-gray-100 dark:bg-[#111111] dark:border-gray-800'
        }`}
      >
        <div className="mx-auto flex h-[60px] max-w-5xl items-center justify-between px-6">
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold sm:block">{siteMetadata.headerTitle}</div>
            </div>
          </Link>
          <div className="flex items-center text-base leading-5">
            <div className="hidden space-x-3 sm:block">
              {headerNavLinks.map((link) => (
                <Link href={link.href} key={link.title} aria-label={link.title}>
                  <button
                    className={`rounded font-medium py-2 px-3 ${
                      router.asPath === link.href
                        ? 'py-2 px-3 rounded dark:text-white bg-gray-200 dark:bg-gray-800'
                        : 'py-2 px-3 hover:rounded hover:py-2 hover:px-3 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.title}
                  </button>
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  )
}

export default NavBar
