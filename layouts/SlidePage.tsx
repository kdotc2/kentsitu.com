'use client'

import React, { ReactNode, useEffect } from 'react'
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

export default function SlidePage({ children }: SlidePageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Memoize slide notes
  const slideNotes = React.useMemo((): NotesContent => {
    const generatedNotes: NotesContent = {}
    let generatorCount = 0

    const processChild = (child: ReactNode) => {
      if (!React.isValidElement(child)) return

      if (child.type === 'hr') {
        generatorCount++
      } else if (child.type === SpeakerNotes) {
        if (!generatedNotes[generatorCount]) {
          generatedNotes[generatorCount] = []
        }
        React.Children.forEach(child.props.children, (noteChild) => {
          if (React.isValidElement(noteChild)) {
            generatedNotes[generatorCount].push(noteChild)
          }
        })
      } else if (child.props?.children) {
        React.Children.forEach(child.props.children, processChild)
      }
    }

    React.Children.forEach(children, processChild)
    return generatedNotes
  }, [children])

  // Memoize slide content
  const slides = React.useMemo(() => {
    const renderedSlides: ReactNode[][] = [[]]
    let currentIndex = 0

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return

      if (child.type === 'hr') {
        currentIndex++
        renderedSlides[currentIndex] = []
      } else {
        renderedSlides[currentIndex].push(child)
      }
    })

    return renderedSlides
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
            'flex items-center justify-center bg-black text-white p-8',
            mode === 'speaker' ? 'h-20' : 'min-h-screen'
          )}
        >
          <Slide>{slides[currentSlide]}</Slide>
        </div>
      </PresentationMode>
    </Swipeable>
  )
}
