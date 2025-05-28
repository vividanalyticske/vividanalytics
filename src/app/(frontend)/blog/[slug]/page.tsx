import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { fetchAllPosts, fetchRelatedPosts } from '@/lib/postsUtil'
import { RichText } from '@payloadcms/richtext-lexical/react'
import NewsletterBox from '@/components/blogPage/NewsletterBox'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'blog',
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
      title: 'Insight Not Found – Vivid Analytics',
      description:
        'The insight you are looking for could not be found. Explore more perspectives on data strategy, innovation, and sustainability from Vivid Analytics.',
    }
  }

  const postTitle = post.title || 'Insight – Vivid Analytics'
  const postExcerpt =
    post.content ||
    'Explore data-driven insights, strategic thinking, and climate-conscious innovation with Vivid Analytics.'

  return {
    title: `${postTitle} – Vivid Analytics`,
    description: postExcerpt,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
    openGraph: {
      title: `${postTitle} – Vivid Analytics`,
      description: postExcerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      images: [
        {
          url:
            post.coverImage && typeof post.coverImage === 'object' && post.coverImage.url
              ? post.coverImage.url
              : '/bg.jpg', // Recommended: Branded fallback blog image
          width: 1200,
          height: 630,
          alt: post.title || 'Vivid Analytics Blog',
        },
      ],
      type: 'article',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
    },
  }
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'blog',
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

  // Fetch related posts
  const data = await fetchRelatedPosts(slug)
  const relatedPosts = data.slice(0, 4)

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
              className="object-cover"
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
              {/* Related Posts For Desktop */}
              <div className="hidden lg:block mb-8">
                <h2 className="text-xl font-bold text-[#13589e] mb-6 flex items-center">
                  <div className="w-1 h-6 bg-[#b4d23d] mr-3"></div>
                  Related Articles
                </h2>

                {relatedPosts && relatedPosts.length > 0 ? (
                  <div className="space-y-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        href={`/publications/${relatedPost.slug}`}
                        key={relatedPost.id}
                        className="group block"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-md">
                            {relatedPost.coverImage ? (
                              <Image
                                src={
                                  typeof relatedPost.coverImage === 'object' &&
                                  relatedPost.coverImage.url
                                    ? relatedPost.coverImage.url
                                    : '/bg.jpg'
                                }
                                alt={relatedPost.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gradient-to-r from-[#13589e] to-[#0d4175]"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-900 group-hover:text-[#13589e] line-clamp-2 transition duration-200">
                              {relatedPost.title}
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                              {new Date(relatedPost.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No related articles found.</p>
                )}

                <div className="mt-8 border-t border-gray-100 pt-6">
                  <Link
                    href="/publications"
                    className="inline-flex items-center text-[#13589e] hover:text-[#b4d23d] font-medium transition"
                  >
                    <span>View all publications</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

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

            {/* Related Posts For Mobile */}
            <div className="mt-12 lg:hidden">
              <h2 className="text-xl font-bold text-[#13589e] mb-6 flex items-center">
                <div className="w-1 h-6 bg-[#b4d23d] mr-3"></div>
                Related Articles
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts && relatedPosts.length > 0 ? (
                  relatedPosts.slice(0, 2).map((relatedPost) => (
                    <Link
                      href={`/publications/${relatedPost.slug}`}
                      key={relatedPost.id}
                      className="group"
                    >
                      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full border border-gray-100 transition transform hover:-translate-y-1 hover:shadow-md">
                        <div className="relative h-40 w-full">
                          {relatedPost.coverImage ? (
                            <Image
                              src={
                                typeof relatedPost.coverImage === 'object' &&
                                relatedPost.coverImage.url
                                  ? relatedPost.coverImage.url
                                  : '/bg.jpg'
                              }
                              alt={relatedPost.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-r from-[#13589e] to-[#0d4175]"></div>
                          )}
                          <div className="absolute bottom-0 left-0 p-3">
                            <span className="inline-block px-2 py-1 bg-[#b4d23d] text-white text-xs font-medium rounded-full">
                              Blog
                            </span>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#13589e] line-clamp-2 transition">
                            {relatedPost.title}
                          </h3>
                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(relatedPost.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500">No related articles found.</p>
                )}
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center px-5 py-2 bg-[#13589e] text-white rounded-lg hover:bg-[#0d4175] transition shadow-sm"
                >
                  <span>View All Posts</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const allPosts = await fetchAllPosts(1, 100)
    return allPosts.posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
