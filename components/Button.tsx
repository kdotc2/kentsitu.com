const Btn = ({ link, text }) => (
  <div className="">
    <a href={link} target="_blank" rel="noreferrer noopener" aria-label={text} tabIndex={-1}>
      <button className="text-medium rounded-md border-2 py-[10px] px-4 text-sm font-medium text-gray-900 hover:bg-gray-200 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
        {text}
      </button>
    </a>
  </div>
)

export default Btn
