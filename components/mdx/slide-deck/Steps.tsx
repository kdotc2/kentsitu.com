import React, { ReactElement } from 'react'

interface StepProps {
  order?: number
}

type StepsProps = {
  children: ReactElement<StepProps> | ReactElement<StepProps>[]
}

export const Steps = ({ children }: StepsProps) => {
  const renderChildren = () => {
    return React.Children.map(children, (element, index) => {
      if (!React.isValidElement(element)) {
        return null
      }

      return React.cloneElement<StepProps>(element, {
        order: index,
        ...element.props,
      })
    })
  }

  return <div>{renderChildren()}</div>
}

export default Steps
