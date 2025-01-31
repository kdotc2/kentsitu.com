'use client'

import { useState, useEffect } from 'react'
import { useMounted } from '@/hooks/useMounted'

const getRandomCharacter = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:'
  return chars.charAt(Math.floor(Math.random() * chars.length))
}

export const Clock = () => {
  const [time, setTime] = useState(new Date())
  const [isRendered, setIsRendered] = useState(false) // Track if it's the first render
  const [randomTime, setRandomTime] = useState('') // Track random character
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
    if (!isRendered) {
      // Generate random characters once on the first render, respecting spaces
      const randomCharacters = formattedTime
        .split('')
        .map((char) => {
          return char === ' ' ? ' ' : getRandomCharacter() // Preserve spaces
        })
        .join('')
      setRandomTime(randomCharacters)
      setIsRendered(true) // Set that the initial render has occurred
    }

    const timer = setInterval(() => {
      setTime(new Date()) // Update the time every second
    }, 1000)

    return () => clearInterval(timer) // Cleanup the interval on unmount
  }, [isRendered, formattedTime])

  // Only render the clock once mounted
  if (!mounted) return null

  return (
    <div className="text-sm font-medium tabular-nums text-muted-foreground max-md:hidden whitespace-nowrap">
      {formattedTime.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block opacity-0 ${
            isRendered ? 'animate-flip' : ''
          }`}
          style={{
            animationDelay: `${index * 0.1}s`, // Custom delay for staggered animation
          }}
        >
          {isRendered ? (char === ' ' ? '\u00A0' : char) : randomTime[index]}{' '}
          {/* Use &nbsp; for spaces */}
        </span>
      ))}
    </div>
  )
}
