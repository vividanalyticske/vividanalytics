import React from 'react'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'

export const metadata = {
  title: 'Vivid Analytics | Data-Driven Strategy & Climate-Conscious Insights',
  description:
    'Vivid Analytics bridges the gap between information and impact—helping organizations transform data into actionable insights, resilient strategies, and climate-conscious decisions.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Vivid Analytics | Strategic Insights from Data-Driven Intelligence',
    description:
      'At Vivid Analytics, we transform complex data into clear, strategic direction. Discover how our expert team empowers organizations to future-proof missions, uncover opportunities, and drive sustainable growth.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    images: [
      {
        url: '/officialLogo.png',
        width: 1200,
        height: 630,
        alt: 'Vivid Analytics - Transforming Data into Impact',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
