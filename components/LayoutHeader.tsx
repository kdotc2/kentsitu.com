import React from 'react'

type Props = {
  title: string
  description: string | undefined
}

function LayoutHeader({ title, description }: Props) {
  return (
    <div className="space-y-2 pb-10 pt-4">
      <div className="text-2xl font-bold">{title}</div>
      <p>{description}</p>
    </div>
  )
}

export default LayoutHeader
