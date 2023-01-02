import Link from 'next/link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Typewriter from 'typewriter-effect'

export default function index() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="flex h-[calc(100vh-140px)] items-center justify-center px-6 py-20 pb-10 sm:py-24">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl sm:text-5xl">A place for me to</h2>
          <div className="text-3xl sm:text-5xl">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 100,
                strings: ['show my work.', 'explore ideas.', 'learn and experiment.'],
              }}
            />
          </div>
          <div className="py-12">
            <Link href={'/work'}>
              <button className="buttonStyle">Enter Portfolio</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
