export const dynamic = 'force-dynamic'
import { getPayload } from 'payload'
import React from 'react'
import SolutionHero from '@/components/solutionpage/SolutionHero'
import SolutionList from '@/components/solutionpage/SolutionList'

import config from '@/payload.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Solutions | Vivid Analytics – Data-Driven Strategies for Impact',
  description:
    'Explore Vivid Analytics’ solutions that turn complex data into actionable insights. We help organizations make smarter decisions, build resilience, and embed climate-conscious strategies.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/our-solutions`),
  openGraph: {
    title: 'Solutions by Vivid Analytics | From Data to Strategic Advantage',
    description:
      'Discover how Vivid Analytics empowers organizations through expert data analysis, strategic consulting, and sustainability-focused insights.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/our-solutions`,
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/our-solutions`,
  },
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'our-solutions' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  // Render the page layout dynamically
  return (
    <>
      <SolutionHero />
      {page.layout?.map((block, index) => renderBlock(block, index))}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  switch (block.blockType) {
    case 'solutionblock':
      return <SolutionList key={index} block={block} />

    default:
      return null
  }
}
