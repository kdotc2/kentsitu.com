import NextLink from 'next/link'
import type { LinkProps } from 'next/link'
import { ReactNode } from 'react'

interface CustomLinkProps extends LinkProps {
  children: ReactNode
  className?: string
}

const Link = ({ className, children, ...rest }: CustomLinkProps) => (
  <NextLink {...rest} prefetch={false} className={className}>
    {children}
  </NextLink>
)

export default Link
