export const dynamic = 'force-dynamic'

import React from 'react'
import CaseHero from '@/components/casesPage/CaseHero'
import CaseList from '@/components/casesPage/CaseList'
import PaginationComponent from '@/components/navigation/PaginationComponent'
import { fetchAllCases } from '@/lib/caseUtil'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies | Vivid Analytics – Real-World Data Impact',
  description:
    'See how Vivid Analytics empowers organizations with data-driven strategies. Explore real-world case studies showcasing measurable impact, innovation, and climate-conscious outcomes.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/insights/case-studies`),
  openGraph: {
    title: 'Vivid Analytics Case Studies | Data in Action',
    description:
      'Explore case studies that demonstrate how Vivid Analytics turns complex data into strategic decisions. Real results, real impact—powered by evidence and insight.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/insights/case-studies`,
    images: [
      {
        url: '/officialLogo.png',
        width: 1200,
        height: 630,
        alt: 'Vivid Analytics Official Logo',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/insights/case-studies`,
  },
}

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
