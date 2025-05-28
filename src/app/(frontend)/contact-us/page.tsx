import { getPayload } from 'payload'
import React from 'react'
import ContactHero from '@/components/contactPage/ContactHero'
import ContactForm from '@/components/contactPage/ContactSection'
import ContactSocials from '@/components/contactPage/ContactSocials'
import MapArea from '@/components/contactPage/MapArea'

import config from '@/payload.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Vivid Analytics - Let’s Talk Data & Strategy',
  description:
    'Get in touch with Vivid Analytics. Whether you’re looking to explore data-driven opportunities, build resilient strategies, or drive climate-conscious impact-we’re here to help.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`),
  openGraph: {
    title: 'Connect with Vivid Analytics | Strategic Insight Starts Here',
    description:
      'Reach out to Vivid Analytics to discuss how we can help transform your data into actionable strategy. We’re ready to support your mission with evidence-based solutions.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
    images: [
      {
        url: '/officialLogo.png', // Suggest replacing with a branded, professional image
        width: 1200,
        height: 630,
        alt: 'Contact Vivid Analytics',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
  },
}

export default async function ContactPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'contact-us' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  // Render the page layout dynamically
  return (
    <>
      <ContactHero />
      {page.layout?.map((block, index) => renderBlock(block, index))}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  switch (block.blockType) {
    case 'contact':
      return <ContactForm key={index} block={block} />
    case 'contactAddresses':
      return <ContactSocials key={index} block={block} />
    case 'location':
      return <MapArea key={index} block={block} />

    default:
      return null
  }
}
