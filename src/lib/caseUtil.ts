import config from '@/payload.config'
import { getPayload } from 'payload'

export async function fetchAllCases(page = 1, limit = 9) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const res = await payload.find({
    collection: 'casestudies',
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
