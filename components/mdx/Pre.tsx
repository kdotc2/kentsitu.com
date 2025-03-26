'use client'

import { toast } from 'sonner'
import { Copy } from 'lucide-react'
import React from 'react'

type PreProps = React.HTMLProps<HTMLPreElement> // This includes all props for <pre> element

const Pre = (props: PreProps) => {
  const { children, ...rest } = props
  const textInput = React.useRef<HTMLPreElement>(null)

  const onCopy = async () => {
    if (textInput.current) {
      await navigator.clipboard.writeText(textInput.current.textContent || '')
    }

    toast('Snippet copied to clipboard')
  }

  return (
    <div className="relative">
      <button
        className="absolute right-4 top-4 z-10 hidden opacity-0 transition md:flex [div:hover>&]:opacity-100"
        onClick={onCopy}
        type="button"
        aria-label="Copy to clipboard"
        title="Copy to clipboard"
      >
        <Copy className="h-5 w-5" />
      </button>
      <pre className="overflow-x-scroll" ref={textInput} {...rest}>
        {children}
      </pre>
    </div>
  )
}

export default Pre
