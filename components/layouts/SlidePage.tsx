'use client'

import React, { ReactNode, useEffect, isValidElement, Children } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Slide } from '@/components/slide-deck/Slide'
import { PresentationMode } from '@/components/slide-deck/PresentationMode'
import Swipeable from '@/components/slide-deck/Swipeable'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { cn } from '@/lib/utils'
import SpeakerNotes from '@/components/slide-deck/SpeakerNotes'

type NotesContent = Record<number, ReactNode[]>

interface SlidePageProps {
  children: ReactNode
}

const processChildren = (
  children: ReactNode,
  slideNotes: NotesContent,
  slides: ReactNode[][]
) => {
  let currentIndex = 0
  const generatorCount = 0

  // Process each child in one pass
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return

    const childProps = child.props as { children?: ReactNode } // Type assertion to access child.props

    if (child.type === 'hr') {
      // New slide separation
      currentIndex++
      slides[currentIndex] = []
    } else if (child.type === SpeakerNotes) {
      // Process speaker notes
      if (!slideNotes[generatorCount]) slideNotes[generatorCount] = []
      Children.forEach(childProps.children, (noteChild) => {
        if (isValidElement(noteChild))
          slideNotes[generatorCount].push(noteChild)
      })
    } else {
      // Normal slide content
      slides[currentIndex].push(child)
    }
  })
}

export default function SlidePage({ children }: SlidePageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Memoize slide notes and content by processing children once
  const { slideNotes, slides } = React.useMemo(() => {
    const notes: NotesContent = {}
    const slidesArr: ReactNode[][] = [[]]

    processChildren(children, notes, slidesArr)

    return { slideNotes: notes, slides: slidesArr }
  }, [children])

  const { currentSlide, mode, setSlide } = useKeyboardNavigation({
    slideCount: slides.length - 1,
  })

  // Update URL with mode and currentSlide
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('mode', mode)
    params.set('slide', currentSlide.toString())
    router.push(`${pathname}?${params.toString()}`)
  }, [currentSlide, mode, pathname, router, searchParams])

  return (
    <Swipeable
      onSwipedLeft={() =>
        setSlide((prev) => Math.min(prev + 1, slides.length - 1))
      }
      onSwipedRight={() => setSlide((prev) => Math.max(prev - 1, 0))}
    >
      <PresentationMode
        mode={mode as 'slideshow' | 'speaker'}
        notes={slideNotes[currentSlide] || []}
        currentSlide={currentSlide}
      >
        <div
          id="slide"
          className={cn(
            'flex items-center justify-center p-8',
            mode === 'speaker' ? 'h-20' : 'min-h-screen'
          )}
        >
          <Slide>{slides[currentSlide]}</Slide>
        </div>
      </PresentationMode>
    </Swipeable>
  )
}
