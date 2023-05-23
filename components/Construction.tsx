'use client'
import { useRouter } from 'next/navigation'

const Construction = () => {
  const router = useRouter()
  const previousPath = router.back
  return (
    <div className="flex items-center justify-center supports-[height:100dvh]:h-[calc(100dvh-64px)] sm:h-[calc(100vh-84px)] md:h-[calc(100vh-40px)] lg:h-[calc(100vh-80px)]">
      <div className="text-center">
        <div className="space-x-2">
          <span role="img" aria-label="roadwork sign">
            🚧
          </span>{' '}
          <span className="text sm font-semibold"> Under Construction</span>
        </div>
        <div className="py-8">
          <button onClick={previousPath} className="buttonStyle">
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Construction
