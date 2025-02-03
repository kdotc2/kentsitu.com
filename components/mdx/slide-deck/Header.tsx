import React from 'react'
import Link from 'next/link'

// Define the types for the component's props
interface HeaderProps {
  name: string
  title: string
  date: string
  url: string
}

const Header: React.FC<HeaderProps> = ({ name, title, date, url }) => {
  return (
    <header>
      <div>
        <a href={url}>
          <span>{name}</span>
        </a>{' '}
        —{' '}
        <Link href="/1">
          <a>{title}</a>
        </Link>
      </div>
      <time>{date}</time>
    </header>
  )
}

export default Header
