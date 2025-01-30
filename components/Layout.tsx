import { Mdx } from '@/components/mdx/MDXComponents'
import React from 'react'

type LayoutHeaderProps = {
  title: string
  description: React.ReactNode
}

type LayoutContentProps = {
  className?: string
}

export const LayoutHeader = ({ title, description }: LayoutHeaderProps) => {
  return (
    <div className="space-y-2 pb-10">
      <div className="text-2xl font-bold">{title}</div>
      <p>{description}</p>
    </div>
  )
}

export const LayoutContent = ({ className }: LayoutContentProps) => {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <Mdx content={post} MDXComponents={MDXComponents} />
    </div>
  )
}
