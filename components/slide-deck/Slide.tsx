import React from 'react'
import { cn } from '@/lib/utils'

interface SlideProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export const Slide = ({ children, id, className = '' }: SlideProps) => {
  return (
    <div id={id} className={cn('flex', className)}>
      <div className="w-full max-w-4xl mx-auto px-8">{children}</div>
    </div>
  )
}
