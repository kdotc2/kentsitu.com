'use client'
import AnimateEnter from '@components/Animate'
import { Clock } from '@components/Clock'
import Link from 'next/link'

export default function Home() {
  return (
    <AnimateEnter>
      <div className="flex flex-col items-center justify-center px-6 supports-[height:100dvh]:h-[calc(100dvh-64px)] sm:h-[calc(100vh-84px)] md:h-[calc(100vh-40px)] lg:h-[calc(100vh-80px)]">
        <div className="space-y-2 sm:space-y-4">
          <Clock />
          <div className="prose max-w-[350px] dark:prose-dark">
            Welcome to my space on the internet. A place to share my{' '}
            <Link href={'/work'}>designs</Link>, <Link href={'/writing'}>thoughts</Link>, and{' '}
            <Link href={'/changelog'}>progress</Link>.
          </div>
          {/* <div className="flex space-x-4 pt-2">
            <Link href={'/work'} className="linkStyle">
              View Work
            </Link>
            <Link href={'/projects'} className="linkStyle">
              View Projects
            </Link>
          </div> */}
        </div>
      </div>
    </AnimateEnter>
  )
}
