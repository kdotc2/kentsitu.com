import { cn } from '@/lib/utils'
import React from 'react'

export const PageLayout = ({
  title,
  description,
  children,
  className,
}: {
  title: string
  description: React.ReactNode
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className="relative">
      {/* layout header */}
      <div className="space-y-2 pb-10">
        <div className="text-2xl font-bold">{title}</div>
        <p>{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  )
}

export const SlugContent = ({ className }: { className?: string }) => {
  return (
    <div>
      <div
        className={cn('prose max-w-none dark:prose-invert', className)}
      ></div>
    </div>
  )
}
