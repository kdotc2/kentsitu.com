'use client'

import { useRef, useEffect } from 'react'

type EventListenerHandler = (event: Event) => void

type UseEventListenerProps = {
  eventName: string
  handler: EventListenerHandler
  element?: HTMLElement | null
}

export default function useEventListener({
  eventName,
  handler,
  element,
}: UseEventListenerProps) {
  const windowEl = typeof window !== 'undefined' ? window : null
  const eventEl = element ?? windowEl

  // Create a ref that stores the handler
  const savedHandler = useRef<EventListenerHandler | null>(null)

  // Update ref.current value if handler changes
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // Make sure the element supports addEventListener
    const isSupported = eventEl && eventEl.addEventListener
    if (!isSupported) return

    // Create event listener that calls the handler function stored in the ref
    const eventListener = (event: Event) => savedHandler.current?.(event)

    // Add event listener
    eventEl.addEventListener(eventName, eventListener)

    // Remove event listener on cleanup
    return () => {
      eventEl.removeEventListener(eventName, eventListener)
    }
  }, [eventName, eventEl]) // Re-run if eventName or element changes
}
