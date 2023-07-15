import Link from 'next/link'

const Button = ({ link, text }: { link: string; text: string }) => (
  <div>
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text}
      className="linkStyle no-underline"
    >
      <span className="font-medium text-gray-900 dark:text-gray-100">{text}</span>
    </Link>
  </div>
)

export default Button
