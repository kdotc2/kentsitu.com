'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="item-start flex flex-col items-center">
        <div className="flex items-center space-x-3">
          <h1 className="border-r-2 px-3 text-base font-extrabold">404</h1>
          <p className="text-sm">{`Uh oh, it looks like someone took the wrong turn.`}</p>
        </div>
        <div className="py-8">
          <Button
            onClick={() => router.push('/')}
            variant="transparent"
            className="border text-[13px] px-3 py-[10px]"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}
