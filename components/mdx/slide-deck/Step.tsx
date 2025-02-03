'use client'

import React, { ReactNode, useEffect } from 'react'
import { useCurrentSlide } from '@/context/CurrentSlideContext'

interface StepProps {
  children: ReactNode
  order: string
}

export const Step = ({ children, order }: StepProps) => {
  const { currentStep, steps, addStep } = useCurrentSlide()

  useEffect(() => {
    if (!steps.includes(order)) {
      addStep(order)
    }
  }, [order, steps, addStep])

  // Only show if currentStep >= order
  const shouldShow = currentStep >= parseInt(order, 10)

  return shouldShow ? <div>{children}</div> : null
}

export default Step
