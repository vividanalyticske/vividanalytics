import React from 'react'
import CaseHero from '@/components/casesPage/CaseHero'
import CaseList from '@/components/casesPage/CaseList'
import PaginationComponent from '@/components/navigation/PaginationComponent'
import { fetchAllCases } from '@/lib/caseUtil'

type Props = {
  searchParams?: Promise<{
    page?: string
  }>
}

export default async function CasesPage({ searchParams }: Props) {
  const resolvedParams = await searchParams

  const currentPage = Number(resolvedParams?.page) || 1
  const { posts, pagination } = await fetchAllCases(currentPage)

  return (
    <>
      <CaseHero />
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <CaseList key={post.id} post={post} />
          ))}
        </div>

        <PaginationComponent totalPages={pagination.totalPages} />
      </section>
    </>
  )
}
