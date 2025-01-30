import { ReactNode } from 'react'
import { useSwipeable, SwipeableProps } from 'react-swipeable'

interface CustomSwipeableProps extends Omit<SwipeableProps, 'children'> {
  children: ReactNode
}

export const Swipeable = ({ children, ...props }: CustomSwipeableProps) => {
  const handlers = useSwipeable(props)
  return <div {...handlers}>{children}</div>
}

export default Swipeable
