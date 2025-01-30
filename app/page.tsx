import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      <div className="prose max-w-[350px] dark:prose-invert">
        Hello, my name is Kent. I design and build stuff. Welcome to my space on
        the internet. A place to share my <Link href={'/work'}>designs</Link>,{' '}
        <Link href={'/writing'}>thoughts</Link>, and{' '}
        <Link href={'/changelog'}>progress</Link>.
      </div>
    </div>
  )
}
