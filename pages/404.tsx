import Link from 'next/link'
import { PageSEO } from '@/components/SEO'
import { useRouter } from 'next/router'

export default function FourZeroFour() {
  const router = useRouter()
  const finalSlashIndex = router.asPath.lastIndexOf('/')
  const previousPath = router.asPath.slice(0, finalSlashIndex)
  return (
    <>
      <PageSEO title="Page Not Found" description="Sorry we couldn't find this page" />
      <div className="flex h-[calc(100vh-60px)] items-center justify-center">
        <div className="item-start flex flex-col md:items-center">
          <div className="flex flex-col items-start justify-start md:flex-row md:items-center md:justify-center md:space-x-6">
            <div className="space-x-2 pt-4 pb-8 md:space-y-5">
              <h1 className="text-6xl font-extrabold leading-9 text-gray-900 dark:text-gray-100 md:px-6 md:text-8xl md:leading-14">
                404
              </h1>
            </div>
            <div className="max-w-md">
              <p className="py-4 text-xl font-bold leading-normal md:text-2xl">
                Secret page unlocked!
              </p>
              <p className="mb-8">Just kidding, this page doesn't exist.</p>
            </div>
          </div>
          <div className="py-8">
            <Link href={previousPath}>
              <button className="buttonStyle">Go Back!</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
