import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="flex max-w-5xl flex-col justify-between xl:px-0">{children}</section>
}
