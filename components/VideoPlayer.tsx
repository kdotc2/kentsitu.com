import React, { useMemo } from 'react'
import { AdvancedVideo } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { useRef, useState } from 'react'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners'
import { scale } from '@cloudinary/url-gen/actions/resize'
import Image from 'next/image'
import { MdOutlinePauseCircleOutline, MdOutlinePlayCircleOutline } from 'react-icons/md'

// Create and configure your Cloudinary instance.
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dpr8aiobt',
  },
})

const VideoPlayer = ({ id }) => {
  const videoRef = useRef<HTMLVideoElement>()
  const [isPlaying, setIsPlaying] = useState(false)

  const cldVid = useMemo(() => cld.video(id), [id])
  cldVid.roundCorners(byRadius(24)).resize(scale().width(223)).quality(100)

  const playVideo = () => {
    setIsPlaying((status) => {
      if (status) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
      return !status
    })
  }

  return (
    <section>
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
        <AdvancedVideo cldVid={cldVid} innerRef={videoRef} playsInline muted loop autoPlay/>
      </div>
      <div className=" flex justify-center font-medium text-blue-500">
        <button onClick={playVideo}>
          {isPlaying ? (
            <div className="flex items-center justify-between gap-1">
              <MdOutlinePlayCircleOutline className="h-5 w-5" /> Play
            </div>
          ) : (
            <div className="flex items-center justify-between gap-1">
              <MdOutlinePauseCircleOutline className="h-5 w-5" /> Pause
            </div>
          )}
        </button>
      </div>
    </section>
  )
}

export default VideoPlayer
