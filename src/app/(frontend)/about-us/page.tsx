import { getPayload } from 'payload'
import React from 'react'
import AboutHero from '@/components/aboutPage/AboutHero'
import AboutSection from '@/components/aboutPage/AboutSection'
import GoalsSection from '@/components/aboutPage/GoalsSection'
import TeamSection from '@/components/aboutPage/TeamSection'

import config from '@/payload.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Vivid Analytics – Turning Data into Strategic Impact',
  description:
    'Learn more about Vivid Analytics—where data meets action. Discover our mission, values, and how we empower organizations with data-driven strategies and climate-conscious insights.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/about-us`),
  openGraph: {
    title: 'About Vivid Analytics | Where Data Meets Purpose',
    description:
      'At Vivid Analytics, we transform complex datasets into actionable insights. Meet the team behind our mission to drive sustainable, strategic, and data-informed decision-making.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`,
    images: [
      {
        url: '/bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Vivid Analytics Team',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`,
  },
}

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'about-us' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  // Render the page layout dynamically
  return (
    <>
      <AboutHero />
      {page.layout?.map((block, index) => renderBlock(block, index))}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  switch (block.blockType) {
    case 'about':
      return <AboutSection key={index} block={block} />
    case 'goals':
      return <GoalsSection key={index} block={block} />
    case 'ourTeam':
      return <TeamSection key={index} block={block} />
    default:
      return null
  }
}
