import Link from '@/components/Link'

interface Props {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: Props) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="sm:pt-10 pt-6 text-xs font-medium sm:text-sm mx-auto">
      <nav className="flex items-center justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50 invisible" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/work/` : `/work/page/${currentPage - 1}`}>
            <button className="rounded py-2 px-3 md:hover:rounded md:hover:py-2 md:hover:px-3 md:hover:bg-gray-200 md:dark:hover:bg-gray-800">
              Previous
            </button>
          </Link>
        )}
        <span className="py-2">
          Page {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50 invisible" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/work/page/${currentPage + 1}`}>
            <button className="rounded py-2 px-3 md:hover:rounded md:hover:py-2 md:hover:px-3 md:hover:bg-gray-200 md:dark:hover:bg-gray-800">
              Next
            </button>
          </Link>
        )}
      </nav>
    </div>
  )
}
