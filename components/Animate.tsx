'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'

export default function AnimateEnter({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        initial={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
