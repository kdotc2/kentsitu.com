'use client'

import { Clipboard, ClipboardCheck } from 'lucide-react'
import React from 'react'

type PreProps = React.HTMLProps<HTMLPreElement> // This includes all props for <pre> element

const Pre = (props: PreProps) => {
  const { children, ...rest } = props

  const textInput = React.useRef<HTMLPreElement>(null)
  const [isCopied, setCopied] = React.useState(false)

  const onCopy = async () => {
    setCopied(true)
  }

  React.useEffect(() => {
    if (!isCopied) return

    const timerId = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => {
      clearTimeout(timerId)
    }
  }, [isCopied])

  return (
    <div className="relative">
      <button
        className="absolute right-4 top-4 z-10 hidden opacity-0 transition md:flex [div:hover>&]:opacity-100"
        onClick={onCopy}
        type="button"
        aria-label="Copy to clipboard"
        title="Copy to clipboard"
      >
        {isCopied ? (
          <ClipboardCheck className="h-5 w-5" />
        ) : (
          <Clipboard className="h-5 w-5" />
        )}
      </button>
      <pre className="overflow-x-scroll" ref={textInput} {...rest}>
        {children}
      </pre>
    </div>
  )
}

export default Pre
