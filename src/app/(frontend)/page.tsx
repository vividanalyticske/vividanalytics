import { getPayload } from 'payload'
import React from 'react'
import HeroBlock from '@/components/homepage/HeroBlock'
import LogosSection from '@/components/homepage/LogosSection'
import HeroAboutSection from '@/components/homepage/HeroAbout'
import HomeServicesSection from '@/components/homepage/ServicesSection'

import config from '@/payload.config'
import './globals.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home-page' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  // Render the page layout dynamically
  return (
    <div>
      <div className="page">{page.layout?.map((block, index) => renderBlock(block, index))}</div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  switch (block.blockType) {
    case 'hero':
      return <HeroBlock key={index} block={block} />
    case 'logos-section':
      return <LogosSection key={index} block={block} />
    case 'hero-about':
      return <HeroAboutSection key={index} block={block} />
    case 'services-block':
      return <HomeServicesSection key={index} block={block} />
    default:
      return null
  }
}
