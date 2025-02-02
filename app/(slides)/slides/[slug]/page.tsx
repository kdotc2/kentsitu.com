'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function SlidesPage() {
  const { slug } = useParams() // Get the dynamic parameter from the URL (now named 'slug')
  const [loading, setLoading] = useState(true)
  const [Content, setContent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    if (slug) {
      const loadContent = async () => {
        const LoadedContent = await import(`@/content/slides/${slug}.mdx`)
        setContent(() => LoadedContent.default)
        setLoading(false)
      }
      loadContent()
    }
  }, [slug])

  if (loading || !Content) return <p>Loading...</p>

  return <Content />
}
