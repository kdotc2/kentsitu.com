'use client'
import Image from './Image'
import { useRef, useState } from 'react'
import { PlayCircleIcon, PauseCircleIcon } from '@heroicons/react/24/outline'

const VideoPlayer = ({
  link,
  poster,
  phone,
  width,
}: {
  link: string
  poster: string
  phone: string
  width: string
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
    <div className="group block object-scale-down py-4">
      <div className="group relative flex flex-col items-center justify-center">
        <div className="group absolute z-10">
          <Image
            alt="iPhone layout"
            src={`/static/videos/${phone ? phone : 'iPhoneXS'}.png`}
            width={250}
            height={503}
          />
        </div>
        <div className="group">
          <video
            className="rounded-[20px]"
            src={link}
            poster={poster}
            ref={videoRef}
            width={width ? width : '220'}
            height={'auto'}
            loop
            muted
            playsInline
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center font-medium text-blue-500">
        <button onClick={playVideo} className="rounded">
          {isPlaying ? (
            <span className="flex items-center justify-between gap-1">
              <PauseCircleIcon className="h-5 w-5" /> Pause
            </span>
          ) : (
            <span className="flex items-center justify-between gap-1">
              <PlayCircleIcon className="h-5 w-5" /> Play
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
export default VideoPlayer
