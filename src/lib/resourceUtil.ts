import config from '@/payload.config'
import { getPayload } from 'payload'

export async function fetchResources(page = 1, limit = 9) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const res = await payload.find({
    collection: 'resources',
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
      description: posts.description,
      document: posts.document,
    })),
    pagination: {
      hasNextPage: res.hasNextPage,
      hasPrevPage: res.hasPrevPage,
      totalPages: res.totalPages,
      page: res.page,
    },
  }
}
