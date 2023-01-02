const Btn = ({ link, text }) => (
  <div className="">
    <a href={link} target="_blank" rel="noreferrer noopener">
      <button className="text-medium text-gray-900 dark:text-gray-200 rounded-md border-2 py-[14px] px-6 font-medium hover:bg-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
        {text}
      </button>
    </a>
  </div>
)

export default Btn
