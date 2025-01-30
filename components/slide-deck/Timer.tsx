'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Flex } from '@/components/ui/flex'

// Helper function to format seconds as hh:mm:ss
const formatTime = (seconds: number) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')
  return `${hours}:${minutes}:${secs}`
}

export default function Timer() {
  const [seconds, setSeconds] = React.useState(0)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (active) {
        setSeconds((prev) => prev + 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [active])

  const handleStartStop = () => {
    if (active) {
      setActive(false)
    } else {
      setActive(true)
    }
  }

  const handleReset = () => {
    setActive(false)
    setSeconds(0)
  }

  return (
    <Flex align="center" gap="xs">
      {/* Show the Reset button only when the timer is stopped */}
      {!active && seconds > 0 && (
        <Button
          variant="outline"
          onClick={handleReset}
          className="border-0 px-4 py-2 rounded"
        >
          Reset Timer
        </Button>
      )}

      <Button
        variant="outline"
        onClick={handleStartStop}
        className="border-0 px-4 py-2 rounded"
      >
        {active ? 'Stop Timer' : 'Start Timer'}
      </Button>

      <div className="tabular-nums">{formatTime(seconds)}</div>
    </Flex>
  )
}
