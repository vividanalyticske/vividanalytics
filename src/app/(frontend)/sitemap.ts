import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postsRes, areaRes, resRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
      next: { revalidate: 3600 },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/casestudies`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources`),
  ])

  if (!postsRes.ok || !areaRes.ok || !resRes.ok) {
    throw new Error(`Failed to fetch data`)
  }

  const postsData = await postsRes.json()
  const practiceData = await areaRes.json()
  const resourcesData = await resRes.json()

  const posts: { slug: string }[] = postsData.docs
  const practiceArea: { slug: string }[] = practiceData.docs
  const resources: { slug: string }[] = resourcesData.docs

  const postEntries: MetadataRoute.Sitemap = posts.map((post: { slug: string }) => ({
    type: 'posts',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const practiceEntries: MetadataRoute.Sitemap = practiceArea.map((post: { slug: string }) => ({
    type: 'blog',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/insights/case-studies/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const resourceEntries: MetadataRoute.Sitemap = resources.map((post: { slug: string }) => ({
    type: 'resources',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/insights/resources/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: 'https://www.vividanalytics.co',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://www.vividanalytics.co/about-us',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.vividanalytics.co/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },

    {
      url: 'https://www.vividanalytics.co/insights',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://www.vividanalytics.co/insights/case-studies',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://www.vividanalytics.co/insights/resources',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://www.vividanalytics.co/our-solutions',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://www.vividanalytics.co/contact-us',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...postEntries,
    ...practiceEntries,
    ...resourceEntries,
  ]
}
