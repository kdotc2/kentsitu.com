'use client'
import Image from './Image'
import { useRef, useState } from 'react'
import { CirclePlay, PauseCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const VideoPlayer = ({
  link,
  poster,
  phone,
  width,
  className,
  videoClassName,
  playButtonClassName,
  hideLayout,
}: {
  link: string
  poster: string
  phone?: string
  width: string
  className?: string
  videoClassName?: string
  playButtonClassName?: string
  hideLayout?: true
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
    <div className={cn('group block object-scale-down py-4', className)}>
      <div className="group relative flex flex-col items-center justify-center">
        {!hideLayout && (
          <div className="group absolute z-10 min-h-[503px]">
            <Image
              alt="iPhone layout"
              src={`/videos/${phone ? phone : 'iPhoneXS'}.png`}
              width={250}
              height={503}
            />
          </div>
        )}
        <div className="group">
          <video
            className={cn('rounded-[20px]', videoClassName)}
            src={link}
            poster={poster}
            ref={videoRef}
            width={width ? width : '220'}
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
          'mt-8 flex justify-center font-medium text-blue-500',
          playButtonClassName
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
