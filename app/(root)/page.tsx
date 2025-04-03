import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center md:supports-[height:100dvh]:h-[calc(100dvh-144px)] py-10">
      <div className="prose max-w-[450px] dark:prose-invert">
        <p>
          Hello, my name is Kent. Welcome to my space on the web. A place to
          share my <Link href={'/work'}>work</Link>,{' '}
          <Link href={'/writing'}>thoughts</Link>, and{' '}
          <Link href={'/changelog'}>progress</Link>.
        </p>

        <p>
          I am a Product Designer with experience crafting product experiences
          from 0 {`->`} 1. I have helped companies drive revenue growth through
          A/B testing and iterative design.
        </p>

        <p>
          I enjoy tinkering and learning new technologies. Currently learning
          and improving my frontend engineering skills.
        </p>
      </div>
    </div>
  )
}
