import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const flexVariants = cva(
  'flex', // Default class
  {
    variants: {
      direction: {
        row: 'flex-row',
        col: 'flex-col',
        column: 'flex-col',
        rowReverse: 'flex-row-reverse',
        colReverse: 'flex-col-reverse',
      },
      justify: {
        start: 'justify-start',
        end: 'justify-end',
        center: 'justify-center',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      align: {
        start: 'items-start',
        end: 'items-end',
        center: 'items-center',
        baseline: 'items-baseline',
        stretch: 'items-stretch',
      },
      wrap: {
        noWrap: 'flex-nowrap',
        wrap: 'flex-wrap',
        wrapReverse: 'flex-wrap-reverse',
      },
      grow: {
        grow: 'flex-grow',
        noGrow: 'flex-grow-0',
      },
      shrink: {
        shrink: 'flex-shrink',
        noShrink: 'flex-shrink-0',
      },
      basis: {
        auto: 'flex-auto',
        initial: 'flex-initial',
        none: 'flex-none',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-3',
        md: 'gap-4',
        lg: 'gap-5',
        xl: 'gap-6',
      },
      flex: {
        '1': 'flex-1',
        '[1]': 'flex-[1]',
        auto: 'flex-auto',
        initial: 'flex-initial',
        none: 'flex-none',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      direction: 'row',
      justify: undefined,
      align: undefined,
      wrap: undefined,
      grow: undefined,
      shrink: undefined,
      basis: undefined,
    },
  }
)

export type FlexProps<C extends React.ElementType = 'p'> = {
  as?: C
  asChild?: boolean
} & VariantProps<typeof flexVariants> &
  React.HTMLAttributes<React.ElementType<C>>

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      as,
      className,
      direction,
      justify,
      align,
      wrap,
      grow,
      shrink,
      basis,
      gap,
      flex,
      fullWidth,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : as ?? 'div'
    const computed = flexVariants({
      direction,
      justify,
      align,
      wrap,
      grow,
      shrink,
      basis,
      gap,
      flex,
      fullWidth,
      className,
    })
    // @ts-expect-error HTML types are hard
    return <Comp className={computed} ref={ref} {...props} />
  }
)
Flex.displayName = 'Flex'

export { Flex, flexVariants }
