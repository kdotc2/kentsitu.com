const Btn = ({ link, text }) => (
  <div className="">
    <a href={link} target="_blank" rel="noreferrer noopener" aria-label={text} tabIndex={-1}>
      <button className="text-medium rounded-md border-2 py-[8px] px-3 text-sm font-medium text-gray-900 hover:bg-gray-200 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white sm:py-[10px] sm:px-4 sm:text-base">
        {text}
      </button>
    </a>
  </div>
)

export default Btn
