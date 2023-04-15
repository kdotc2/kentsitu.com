import Link from 'next/link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Typewriter from 'typewriter-effect'

export default function index() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="flex sm:h-[calc(100vh-60px)] supports-[height:100dvh]:h-[calc(100dvh-60px)] items-center justify-center px-6">
        <div className="sm:space-y-4 space-y-2 text-center">
          <h2 className="text-2xl sm:text-4xl">My space to</h2>
          <div className="text-2xl sm:text-4xl pl-3 sm:pl-[18px]">
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
    </>
  )
}
