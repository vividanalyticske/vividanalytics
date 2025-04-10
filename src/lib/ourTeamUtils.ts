import config from '@/payload.config'
import { getPayload } from 'payload'

export async function fetchAllMembers() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: teamMembers } = await payload.find({
    collection: 'team',
    depth: 2,
    limit: 1000,
  })

  return teamMembers.map((member) => ({
    slug: member.slug,
  }))
}

export async function fetchRelatedMembers(currentSlug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: teamMembers } = await payload.find({
    collection: 'team',
    depth: 1,
    limit: 3,
    where: {
      slug: {
        not_equals: currentSlug,
      },
    },
  })

  return teamMembers
}
