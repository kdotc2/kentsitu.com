const Button = ({ link, text }: { link: string; text: string }) => (
  <div className="">
    <a href={link} target="_blank" rel="noreferrer noopener" aria-label={text} tabIndex={-1}>
      <button className="text-medium rounded-md border px-4 py-[10px] text-sm font-medium text-gray-900 hover:bg-gray-200 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
        {text}
      </button>
    </a>
  </div>
)

export default Button
