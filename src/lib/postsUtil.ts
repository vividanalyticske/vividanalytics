import config from '@/payload.config'
import { getPayload } from 'payload'

export async function fetchAllPosts(page = 1, limit = 2) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const res = await payload.find({
    collection: 'blog',
    depth: 2,
    limit,
    page,
  })

  return {
    posts: res.docs.map((posts) => ({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      publishedDate: posts.createdAt,
      excerpt: posts.content,
      coverImage: posts.coverImage,
    })),
    pagination: {
      hasNextPage: res.hasNextPage,
      hasPrevPage: res.hasPrevPage,
      totalPages: res.totalPages,
      page: res.page,
    },
  }
}

export async function fetchRelatedPosts(currentSlug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: allBlogs } = await payload.find({
    collection: 'blog',
    depth: 1,
    limit: 4,
    where: {
      slug: {
        not_equals: currentSlug,
      },
    },
  })

  return allBlogs
}
