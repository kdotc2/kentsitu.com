import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import ThemeSwitch from './ThemeSwitch'

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto flex flex-col h-[80px] max-w-5xl items-center justify-center gap-[6px] sm:pb-0 pb-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 sm:justify-between sm:text-sm sm:flex-row">
        <div className="sm:order-first">
          <div className="flex space-x-4 sm:space-x-8">
            <div className="">{`© ${new Date().getFullYear()} ${siteMetadata.author}`}</div>
            <Link
              className="md:hover:text-gray-900 md:dark:hover:text-white"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="order-first">
          <div className="flex space-x-4 sm:space-x-8">
            <div className="md:hover:text-gray-900 md:dark:hover:text-white">
              <ThemeSwitch />
            </div>
            <Link
              className="md:hover:text-gray-900 md:dark:hover:text-white"
              href={`mailto:${siteMetadata.email}`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
