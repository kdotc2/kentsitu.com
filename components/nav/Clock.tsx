'use client'

import { useState, useEffect } from 'react'
import { useMounted } from '@/hooks/useMounted'

export const Clock = () => {
  const [time, setTime] = useState(new Date())
  const mounted = useMounted()

  const formatter = time.toLocaleTimeString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })

  const formattedTime = formatter.replaceAll(',', '')

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date()) // Update the time every second
    }, 1000)

    return () => clearInterval(timer) // Cleanup the interval on unmount
  }, [])

  // Only render the clock once mounted
  if (!mounted)
    return (
      <div className="text-sm tabular-nums text-muted-foreground max-md:hidden whitespace-nowrap">
        Hello!
      </div>
    )

  return (
    <div className="text-sm tabular-nums text-muted-foreground max-md:hidden whitespace-nowrap">
      {formattedTime.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block opacity-0 ${mounted ? 'animate-flip' : ''}`}
          style={{
            animationDelay: `${index * 0.1}s`, // Custom delay for staggered animation
          }}
        >
          {mounted && (char === ' ' ? '\u00A0' : char)}
        </span>
      ))}
    </div>
  )
}
