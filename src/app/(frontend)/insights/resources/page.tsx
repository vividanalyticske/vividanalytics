import React from 'react'
import ResourceHero from '@/components/resourcePage/ResourceHero'
import ResourceList from '@/components/resourcePage/ResourceList'
import PaginationComponent from '@/components/navigation/PaginationComponent'
import { fetchResources } from '@/lib/resourceUtil'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources | Vivid Analytics - Insights, Tools & Guides',
  description:
    'Access curated resources from Vivid Analytics, including downloads, whitepapers, toolkits, and guides to help you navigate data strategy, sustainability, and innovation.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/insights/resources`),
  openGraph: {
    title: 'Vivid Analytics Resources | Learn, Explore, Empower',
    description:
      'Explore valuable resources from Vivid Analytics to support your organization’s data-driven journey—from insights and frameworks to climate-conscious strategies.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/insights/resources`,
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/insights/resources`,
  },
}

type Props = {
  searchParams?: Promise<{
    page?: string
  }>
}

export default async function ResourcesPage({ searchParams }: Props) {
  const resolvedParams = await searchParams

  const currentPage = Number(resolvedParams?.page) || 1
  const { posts, pagination } = await fetchResources(currentPage)
  console.log('RESOURCES', posts)

  return (
    <>
      <ResourceHero />
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ResourceList key={post.id} post={post} />
          ))}
        </div>

        <PaginationComponent totalPages={pagination.totalPages} />
      </section>
    </>
  )
}
