import React, { ReactNode } from 'react'
import MODES from '@/lib/utils/mode'
import Timer from '@/components/mdx/slide-deck/Timer'

export interface Notes {
  [key: number]: ReactNode // Change to ReactNode to allow more flexible content (not just strings)
}

interface PresentationModeProps {
  mode: 'slideshow' | 'speaker'
  notes: Notes
  currentSlide: number
  children: React.ReactNode
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  mode,
  notes,
  currentSlide,
  children,
}) => {
  if (mode === MODES.SPEAKER) {
    return (
      <div className="flex gap-4 justify-center p-4">
        <div className="flex border w-[70%]">
          <div>{children}</div>
        </div>
        <div className="flex flex-col gap-4 w-[30%]">
          <div className="border p-4 overscroll-y-auto">
            {notes[currentSlide]}
          </div>
          <Timer />
        </div>
      </div>
    )
  }
  return <>{children}</>
}
