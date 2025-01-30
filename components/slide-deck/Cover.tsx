'use client'

import React, { ReactNode } from 'react'

interface CoverProps {
  children: ReactNode
}

export default function Cover({ children }: CoverProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-8 text-center">
      {children}
    </div>
  )
}
