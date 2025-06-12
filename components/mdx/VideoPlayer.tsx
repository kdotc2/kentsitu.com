'use client'
import Image from './Image'
import { useRef, useState } from 'react'
import { CirclePlay, PauseCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/useMounted'
import { Button } from '@/components/ui/button'
import { getPublicUrl } from '@/lib/utils/env'

const VideoPlayer = ({
  title,
  poster,
  phone,
  width,
}: {
  title: string
  poster?: string
  phone?: boolean
  width?: number | string
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const mounted = useMounted()
  const videoRef = useRef<HTMLVideoElement>(null)
  const publicUrl = getPublicUrl()

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

  if (!mounted) {
    return (
      <div className={cn('group block object-scale-down', phone && 'py-4')}>
        <div
          className={cn(
            'group relative flex flex-col items-center justify-center',
            phone && 'min-h-[503px]'
          )}
        >
          {/* Placeholder content that matches the eventual size */}
          {poster && (
            <img
              src={poster}
              alt="Video poster"
              className={cn('border', phone && 'rounded-[20px] border-none')}
              style={{ width }}
            />
          )}
        </div>
        <div
          className={cn(
            'mt-4 flex justify-center font-medium text-blue-500',
            phone && 'mt-8'
          )}
        >
          <Button
            variant="icon"
            onClick={playVideo}
            className="p-0 text-base h-7 rounded"
          >
            <span className="flex items-center justify-between gap-1">
              <CirclePlay className="h-5 w-5" /> Play
            </span>
          </Button>
        </div>
      </div>
    )
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
              src={`/images/iPhone13Pro.png`}
              width={250}
              height={506}
              style={{ width: 250, height: 506 }}
            />
          </div>
        )}
        <div className="group">
          <video
            className={cn('border', phone && 'rounded-[20px] border-none')}
            src={`${publicUrl}/videos/${title}.mp4`}
            poster={poster}
            ref={videoRef}
            width={width}
            height={'auto'}
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>

      <div
        className={cn(
          'mt-4 flex justify-center font-medium text-blue-500',
          phone && 'mt-8'
        )}
      >
        <Button
          variant="icon"
          onClick={playVideo}
          className="p-0 text-base h-7 rounded"
          aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isPlaying ? (
            <span className="flex items-center justify-between gap-1">
              <PauseCircle /> Pause
            </span>
          ) : (
            <span className="flex items-center justify-between gap-1">
              <CirclePlay /> Play
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
export default VideoPlayer
