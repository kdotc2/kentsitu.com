'use client'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  const previousPath = router.back
  return (
    <div className="flex items-center justify-center supports-[height:100dvh]:h-[calc(100dvh-64px)] sm:h-[calc(100vh-84px)] md:h-[calc(100vh-40px)] lg:h-[calc(100vh-80px)]">
      <div className="item-start flex flex-col items-center">
        <div className="flex items-center space-x-3">
          <h1 className="border-r-2 px-3 text-base font-extrabold">404</h1>
          <p className="text-sm">{`Uh oh, it looks like someone took the wrong turn.`}</p>
        </div>
        <div className="py-8">
          <button onClick={previousPath} className="linkStyle">
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
