'use client'

import { useState, useEffect } from 'react'
import { useMounted } from '@/hooks/useMounted'

export const Clock = () => {
  const [time, setTime] = useState(new Date())
  const mounted = useMounted()

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
      <div className="text-sm font-medium tabular-nums text-muted-foreground max-md:hidden">
        {`Day Mon 00 88:88:88 `}
      </div>
    )

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

  return (
    <div className="text-sm font-medium tabular-nums text-muted-foreground max-md:hidden">
      {formattedTime}
    </div>
  )
}
