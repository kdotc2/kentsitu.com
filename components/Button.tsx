const Btn = ({ link, text }) => (
  <div className="">
    <a href={link} target="_blank" rel="noreferrer noopener" aria-label={text} tabIndex={-1}>
      <button className="text-medium text-gray-900 dark:text-gray-200 rounded-md border-2 font-medium hover:bg-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white py-[8px] px-3 sm:py-[10px] text-sm sm:text-base sm:px-4">
        {text}
      </button>
    </a>
  </div>
)

export default Btn
