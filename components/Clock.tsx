'use client'

import { useEffect, useState } from 'react'

export const Clock = () => {
  const [time, setTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

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

  useEffect(() => {
    setMounted(true)

    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return <div className="text-sm font-medium tabular-nums">{formattedTime}</div>
}
