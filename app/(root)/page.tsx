import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center md:supports-[height:100dvh]:h-[calc(100dvh-144px)] md:m-10 max-md:my-10">
      <div className="prose max-w-[475px] dark:prose-invert">
        <p>
          Hello, my name is Kent. Welcome to my space on the internet. A place
          to share my <Link href={'/work'}>work</Link>,{' '}
          <Link href={'/writing'}>thoughts</Link>, and{' '}
          <Link href={'/changelog'}>progress</Link>.
        </p>

        <p>
          I have 7+ years of experience in design. I help early-stage startups
          turn their concepts into great product experiences.
        </p>

        <p>
          I enjoy tinkering and learning new technologies, currently improving
          my frontend engineering skills.
        </p>
      </div>
    </div>
  )
}
