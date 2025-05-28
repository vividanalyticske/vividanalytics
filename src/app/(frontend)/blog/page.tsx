import React from 'react'
import BlogHero from '@/components/blogPage/BlogHero'
import BlogList from '@/components/blogPage/BlogList'
import PaginationComponent from '@/components/navigation/PaginationComponent'
import { fetchAllPosts } from '@/lib/postsUtil'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights Blog | Vivid Analytics – Data, Strategy & Sustainability',
  description:
    'Explore expert insights from Vivid Analytics. Stay informed on data strategy, climate-conscious innovation, and evidence-based decision-making that drives real-world impact.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/blog`),
  openGraph: {
    title: 'Vivid Analytics Blog | Insights on Data, Strategy & Impact',
    description:
      'Read the latest articles from Vivid Analytics on turning data into action. Discover trends, tips, and thought leadership in analytics, strategy, and sustainability.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    images: [
      {
        url: '/officialLogo.png',
        width: 1200,
        height: 630,
        alt: 'Vivid Analytics Blog',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
}

type Props = {
  searchParams?: Promise<{
    page?: string
  }>
}

export default async function BlogPage({ searchParams }: Props) {
  const resolvedParams = await searchParams

  const currentPage = Number(resolvedParams?.page) || 1
  const { posts, pagination } = await fetchAllPosts(currentPage)

  return (
    <>
      <BlogHero />
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogList key={post.id} post={post} />
          ))}
        </div>

        <PaginationComponent totalPages={pagination.totalPages} />
      </section>
    </>
  )
}
