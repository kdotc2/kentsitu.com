import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-2xl font-bold leading-10 sm:text-3xl sm:leading-12 md:leading-14">
      {children}
    </h1>
  )
}
