'use client'

import { useEffect } from 'react'
import { useMode } from '@/context/ModeContext'
import { useCurrentSlide } from '@/context/CurrentSlideContext'
import MODES from '@/lib/utils/mode'

interface NavigationConfig {
  slideCount: number
  onNavigate?: () => void
}

export function useKeyboardNavigation({ slideCount }: NavigationConfig) {
  const {
    currentSlide,
    setSlide,
    steps,
    currentStep,
    setCurrentStep,
    clearSteps,
  } = useCurrentSlide()
  const { mode, setMode } = useMode()

  useEffect(() => {
    const channel = new BroadcastChannel('slide-deck')

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle presenter mode
      if (e.altKey && e.code === 'KeyP') {
        const newMode = mode === MODES.SPEAKER ? MODES.SLIDESHOW : MODES.SPEAKER
        setMode(newMode)

        if (newMode === MODES.SPEAKER) {
          window.open(
            `${window.location.pathname}?mode=${MODES.SPEAKER}#${currentSlide}`,
            'speaker-notes',
            'width=1000,height=800'
          )
        }
        return
      }

      // Handle navigation
      switch (e.code) {
        case 'ArrowLeft':
          if (currentSlide > 0) {
            if (steps.length > 0 && currentStep > 0) {
              setCurrentStep((prev) => prev - 1)
            } else {
              setSlide((prev) => prev - 1)
              channel.postMessage({
                type: 'SLIDE_CHANGE',
                slide: currentSlide - 1,
              })
              clearSteps()
            }
          }
          break

        case 'ArrowRight':
        case 'Space':
        case 'Enter':
          if (currentSlide < slideCount) {
            if (steps.length > 0 && currentStep < steps.length - 1) {
              setCurrentStep((prev) => prev + 1)
            } else {
              setSlide((prev) => prev + 1)
              channel.postMessage({
                type: 'SLIDE_CHANGE',
                slide: currentSlide + 1,
              })
              clearSteps()
            }
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Listen for broadcast messages
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'SLIDE_CHANGE') {
        setSlide(e.data.slide)
      }
    }
    channel.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      channel.removeEventListener('message', handleMessage)
      channel.close()
    }
  }, [
    currentSlide,
    currentStep,
    steps,
    mode,
    slideCount,
    setSlide,
    setCurrentStep,
    clearSteps,
    setMode,
  ])

  return {
    currentSlide,
    setSlide,
    mode,
  }
}
