'use client'
import Image from './Image'
import { useRef, useState } from 'react'
import { CirclePlay, PauseCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const VideoPlayer = ({
  link,
  poster,
  phone,
  width = '100%',
}: {
  link: string
  poster?: string
  phone?: boolean
  width?: string
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const playVideo = () => {
    setIsPlaying(() => {
      if (isPlaying) {
        videoRef.current?.pause()
      } else {
        videoRef.current?.play()
      }
      return !isPlaying
    })
  }
  return (
    <div className={cn('group block object-scale-down', phone && 'py-4')}>
      <div
        className={cn(
          'group relative flex flex-col items-center justify-center',
          phone && 'min-h-[503px]'
        )}
      >
        {phone && (
          <div className="group absolute z-10">
            <Image
              alt="iPhone layout"
              src={`/videos/iPhone13Pro.png`}
              width={250}
              height={503}
            />
          </div>
        )}
        <div className="group">
          <video
            className={cn('border', phone && 'rounded-[20px] border-none')}
            src={link}
            poster={poster}
            ref={videoRef}
            width={width}
            height={'auto'}
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
      </div>

      <div
        className={cn(
          'mt-4 flex justify-center font-medium text-blue-500',
          phone && 'mt-8'
        )}
      >
        <button onClick={playVideo} className="rounded">
          {isPlaying ? (
            <span className="flex items-center justify-between gap-1">
              <PauseCircle className="h-5 w-5" /> Pause
            </span>
          ) : (
            <span className="flex items-center justify-between gap-1">
              <CirclePlay className="h-5 w-5" /> Play
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
export default VideoPlayer
