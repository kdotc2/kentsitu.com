import PageTitle from './PageTitle'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Construction = () => {
  const router = useRouter()
  const finalSlashIndex = router.asPath.lastIndexOf('/')
  const previousPath = router.asPath.slice(0, finalSlashIndex)
  return (
    <div className="flex h-[calc(100vh-140px)] items-center justify-center px-6 py-20 pb-10 sm:py-24">
      <div className="space-y-10 text-center">
        <PageTitle>
          <div>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </div>
        </PageTitle>
        <div className="py-2">
          <Link href={previousPath}>
            <button className="buttonStyle">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Construction
