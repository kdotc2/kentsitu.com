import Image from './Image'
import { useRef, useState } from 'react'
import { MdOutlinePauseCircleOutline, MdOutlinePlayCircleOutline } from 'react-icons/md'

const VideoPlayer = ({ link, poster }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>()

  const playVideo = () => {
    setIsPlaying(() => {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      return !isPlaying
    })
  }
  return (
    <div>
      <div className="flex flex-col relative items-center justify-center">
        <div className="absolute z-10">
          <Image
            alt="iPhone screen"
            src={`/static/videos/iPhoneXS.png`}
            width={250}
            height={503}
            priority
          />
        </div>
        <div className="">
          <video
            className="rounded-[20px]"
            src={link}
            poster={poster}
            ref={videoRef}
            width={223}
            loop
            muted
            playsInline
          />
        </div>
      </div>
      <div className="flex justify-center font-medium text-blue-500">
        <button onClick={playVideo} className="rounded">
          {isPlaying ? (
            <span className="flex items-center justify-between gap-2">
              <MdOutlinePauseCircleOutline className="h-5 w-5" /> Pause
            </span>
          ) : (
            <span className="flex items-center justify-between gap-1">
              <MdOutlinePlayCircleOutline className="h-5 w-5" /> Play
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
export default VideoPlayer