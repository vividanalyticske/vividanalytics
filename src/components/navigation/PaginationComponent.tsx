'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationComponentProps {
  totalPages: number
  className?: string
}

export default function PaginationComponent({
  totalPages,
  className = '',
}: PaginationComponentProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) return null // Hide pagination if only one page

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are less than maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at edges
      if (currentPage <= 2) {
        endPage = 3
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push(-1) // Use -1 to represent ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push(-2) // Use -2 to represent ellipsis
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className={`mt-12 ${className}`}>
      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage - 1)}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : 0}
              onClick={(e) => currentPage === 1 && e.preventDefault()}
              className={`border border-gray-200 rounded-lg hover:border-[#13589e] hover:text-[#13589e] transition-colors duration-200 ${
                currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-[#13589e]/5'
              }`}
            />
          </PaginationItem>

          {pageNumbers.map((pageNumber, index) => {
            if (pageNumber < 0) {
              // Render ellipsis
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis className="text-gray-400" />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={createPageURL(pageNumber)}
                  isActive={currentPage === pageNumber}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors duration-200 ${
                    currentPage === pageNumber
                      ? 'bg-[#13589e] text-white hover:bg-[#0d4175] border-0'
                      : 'text-gray-700 border border-gray-200 hover:border-[#13589e] hover:text-[#13589e] hover:bg-[#13589e]/5'
                  }`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              href={createPageURL(currentPage + 1)}
              aria-disabled={currentPage >= totalPages}
              tabIndex={currentPage >= totalPages ? -1 : 0}
              onClick={(e) => currentPage >= totalPages && e.preventDefault()}
              className={`border border-gray-200 rounded-lg hover:border-[#13589e] hover:text-[#13589e] transition-colors duration-200 ${
                currentPage >= totalPages
                  ? 'pointer-events-none opacity-50'
                  : 'hover:bg-[#13589e]/5'
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
