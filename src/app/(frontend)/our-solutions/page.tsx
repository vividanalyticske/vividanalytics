import { getPayload } from 'payload'
import React from 'react'
import SolutionHero from '@/components/solutionpage/SolutionHero'
import SolutionList from '@/components/solutionpage/SolutionList'

import config from '@/payload.config'

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
