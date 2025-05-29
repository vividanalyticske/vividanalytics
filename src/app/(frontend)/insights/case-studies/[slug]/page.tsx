export const dynamic = 'force-dynamic'

import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import NewsletterBox from '@/components/blogPage/NewsletterBox'
import { fetchAllCases } from '@/lib/caseUtil'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'casestudies',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  const post = docs[0]

  if (!post) {
    return {
      title: 'Case Study Not Found – Vivid Analytics',
      description:
        'The case study you are looking for could not be found. Explore more examples of real-world data impact and strategic innovation from Vivid Analytics.',
    }
  }

  const postTitle = post.title || 'Case Study – Vivid Analytics'
  const postExcerpt =
    post.content ||
    'See how Vivid Analytics turns data into real-world impact. Explore strategies, outcomes, and lessons from our client case studies.'

  return {
    title: `${postTitle} – Vivid Analytics`,
    description: postExcerpt,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
    openGraph: {
      title: `${postTitle} – Vivid Analytics`,
      description: postExcerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/case-studies/${slug}`,
      images: [
        {
          url:
            post.coverImage && typeof post.coverImage === 'object' && post.coverImage.url
              ? post.coverImage.url
              : '/officialLogo.png', // Fallback to official branding
          width: 1200,
          height: 630,
          alt: post.title || 'Vivid Analytics Case Study',
        },
      ],
      type: 'article',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/case-studies/${slug}`,
    },
  }
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'casestudies',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  const post = docs[0]
  if (!post) {
    notFound()
  }

  // Format the published date
  const publishedDate = new Date(post.createdAt)
  const publishedDateFormatted = publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Get how long ago the post was published

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
        {post.coverImage ? (
          <div className="absolute inset-0">
            <Image
              src={
                typeof post.coverImage === 'object' && post.coverImage.url
                  ? post.coverImage.url
                  : '/bg.jpg'
              }
              alt={post.title}
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13589e] to-[#13589e]/20"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#13589e] to-[#0d4175]">
            <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')]"></div>
          </div>
        )}

        <div className="absolute bottom-0 w-full">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-2">
              <span className="bg-[#b4d23d] text-white px-3 py-1 rounded-full text-sm font-medium">
                Blog
              </span>
              <span className="ml-4 text-white/90 text-sm">{publishedDateFormatted}</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Related Posts (on desktop) / Bottom (on mobile) */}
          <aside className="lg:w-1/3 xl:w-1/4 order-2 lg:order-1">
            {/* Sticky sidebar for desktop */}
            <div className="lg:sticky lg:top-8">
              {/* Newsletter Signup */}
              <NewsletterBox />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-2/3 xl:w-3/4 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Content Area */}
              <div className="p-6 md:p-8 lg:p-10">
                <article className="prose prose-lg max-w-none prose-headings:text-[#13589e] prose-headings:font-bold prose-a:text-[#13589e] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                  <RichText data={post.content} className="richtext" />
                </article>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-[#13589e] hover:text-[#b4d23d] transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Publications
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const allPosts = await fetchAllCases(1, 100)
    return allPosts.posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
