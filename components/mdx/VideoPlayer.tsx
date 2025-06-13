'use client'
import Image from './Image'
import { useRef, useState } from 'react'
import { PlayIcon, PauseIcon, RotateCwIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/useMounted'
import { Button } from '@/components/ui/button'

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
  const [hasEnded, setHasEnded] = useState(false)
  const mounted = useMounted()
  const videoRef = useRef<HTMLVideoElement>(null)

  const publicUrl =
    process.env.NEXT_PUBLIC_CDN_URL ??
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL ??
    'http://localhost:3000'
  const videoUrl = `${publicUrl}/videos/${title}.mp4`

  const playVideo = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
      setHasEnded(false)
    }
  }

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
      setHasEnded(false)
    }
  }

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setHasEnded(true)
      setIsPlaying(false)
    }
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
            <span className="flex items-center justify-between gap-2">
              <PlayIcon /> Play
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
            src={videoUrl}
            poster={poster}
            ref={videoRef}
            width={width}
            height="auto"
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
          />
        </div>
      </div>

      <div className={cn('mt-4 flex justify-center font-medium text-blue-500')}>
        {hasEnded ? (
          <Button
            variant="icon"
            onClick={replayVideo}
            className="p-0 text-base h-7 rounded"
            aria-label="Replay Video"
          >
            <span className="flex items-center justify-between gap-2">
              <RotateCwIcon /> Replay
            </span>
          </Button>
        ) : (
          <Button
            variant="icon"
            onClick={playVideo}
            className="p-0 text-base h-7 rounded"
            aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
          >
            <span className="flex items-center justify-between gap-2">
              {isPlaying ? (
                <>
                  <PauseIcon /> Pause
                </>
              ) : (
                <>
                  <PlayIcon /> Play
                </>
              )}
            </span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
