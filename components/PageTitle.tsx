import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="font-bold text-2xl sm:text-3xl sm:leading-12 md:leading-14 leading-10 tracking-wide">
      {children}
    </h1>
  )
}
