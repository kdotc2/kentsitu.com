'use client'
import AnimateEnter from '@components/AnimateEnter'
import Link from 'next/link'
import Typewriter from 'typewriter-effect'

export default function Home() {
  return (
    <AnimateEnter>
      <div className="flex items-center justify-center px-6 supports-[height:100dvh]:h-[calc(100dvh-64px)] sm:h-[calc(100vh-84px)] lg:h-[calc(100vh-80px)] md:h-[calc(100vh-40px)]">
        <div className="space-y-2 text-center tracking-wide sm:space-y-4">
          <h2 className="text-3xl">My space to</h2>
          <div className="pl-3 text-3xl sm:pl-[18px]">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 100,
                strings: ['share work.', 'explore ideas.', 'track progress.'],
              }}
            />
          </div>
          <div className="py-8">
            <Link href={'/work'}>
              <button className="buttonStyle">View Work</button>
            </Link>
          </div>
        </div>
      </div>
    </AnimateEnter>
  )
}
