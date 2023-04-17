import Link from '@/components/Link'

interface Props {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: Props) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="mx-auto pt-6 text-xs font-medium sm:pt-10 sm:text-sm">
      <nav className="flex items-center justify-between">
        {!prevPage && (
          <button
            className="invisible cursor-auto rounded h-[30px] disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/work/` : `/work/page/${currentPage - 1}`}
            tabIndex={-1}
          >
            <button className="rounded h-[30px] px-3 md:hover:rounded md:hover:bg-gray-200 md:hover:px-3 md:dark:hover:bg-gray-700">
              Previous
            </button>
          </Link>
        )}
        <div className="py-2">
          Page {currentPage} of {totalPages}
        </div>
        {!nextPage && (
          <button
            className="invisible cursor-auto rounded h-[30px] px-6 disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/work/page/${currentPage + 1}`} tabIndex={-1}>
            <button className="rounded h-[30px] px-3 md:hover:rounded md:hover:bg-gray-200 md:hover:px-3 md:dark:hover:bg-gray-700">
              Next
            </button>
          </Link>
        )}
      </nav>
    </div>
  )
}
