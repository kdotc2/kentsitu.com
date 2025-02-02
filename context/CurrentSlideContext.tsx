'use client'

import { useSearchParams } from 'next/navigation'
import { createContext, useContext, useState, ReactNode } from 'react'

export interface CurrentSlideContextType {
  currentSlide: number
  setSlide: (value: number | ((prev: number) => number)) => void
  currentStep: number
  setCurrentStep: (value: number | ((prev: number) => number)) => void
  steps: string[]
  setSteps: React.Dispatch<React.SetStateAction<string[]>>
  addStep: (id: string) => void
  removeStep: (id: string) => void
  clearSteps: () => void
}

export const CurrentSlideContext = createContext<CurrentSlideContextType>({
  currentSlide: 0,
  setSlide: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
  steps: [],
  setSteps: () => {},
  addStep: () => {},
  removeStep: () => {},
  clearSteps: () => {},
})

interface CurrentSlideProviderProps {
  children: ReactNode
}

export function CurrentSlideProvider({ children }: CurrentSlideProviderProps) {
  const searchParams = useSearchParams()

  // Get initial slide from hash or search params
  const [currentSlide, setSlide] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return parseInt(window.location.hash.replace('#', ''), 10)
    }
    const slideParam = searchParams.get('slide')
    return slideParam ? parseInt(slideParam, 10) : 0
  })

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [steps, setSteps] = useState<string[]>([])

  const addStep = (id: string) => {
    setSteps((prevSteps) => [...new Set([...prevSteps, id])])
  }

  const removeStep = (id: string) => {
    setSteps((prevSteps) => prevSteps.filter((prevStep) => prevStep !== id))
  }

  const clearSteps = () => {
    setSteps([])
    setCurrentStep(0)
  }

  // Sync current slide state with localStorage for cross-window sync
  const updateSlideInStorage = (slide: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('next-mdx-deck-slide', slide.toString())
    }
  }

  const contextValue: CurrentSlideContextType = {
    currentSlide,
    setSlide: (value) => {
      setSlide(value)
      if (typeof value === 'number') {
        updateSlideInStorage(value)
      }
    },
    currentStep,
    setCurrentStep,
    steps,
    setSteps,
    addStep,
    removeStep,
    clearSteps,
  }

  return (
    <CurrentSlideContext.Provider value={contextValue}>
      {children}
    </CurrentSlideContext.Provider>
  )
}

export const useCurrentSlide = () => useContext(CurrentSlideContext)
