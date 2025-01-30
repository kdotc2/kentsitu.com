import React, { ReactNode } from 'react'
import MODES from '@/lib/utils/mode'
import { Flex } from '../ui/flex'
import Timer from './Timer'

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
      <Flex className="justify-center p-4" gap="md">
        <Flex className="border w-[70%]">
          <div>{children}</div>
        </Flex>
        <Flex direction="column" gap="md" className="w-[30%]">
          <div className="border p-4 overscroll-y-auto">
            {notes[currentSlide]}
          </div>
          <Timer />
        </Flex>
      </Flex>
    )
  }
  return <>{children}</>
}
