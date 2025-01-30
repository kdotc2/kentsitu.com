import React from 'react'
import { Flex } from '@/components/ui/flex'

interface SlideProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export const Slide = ({ children, id, className = '' }: SlideProps) => {
  return (
    <Flex id={id} className={className}>
      <div className="w-full max-w-4xl mx-auto px-8 max-h-[400px]">
        {children}
      </div>
    </Flex>
  )
}
