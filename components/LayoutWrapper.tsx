import SectionContainer from './SectionContainer'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div>
      <SectionContainer>
        <div className="flex h-screen flex-col justify-between px-6 md:px-4">
          <main className="mb-auto">{children}</main>
        </div>
      </SectionContainer>
    </div>
  )
}

export default LayoutWrapper
