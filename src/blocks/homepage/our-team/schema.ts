import { Block } from 'payload'

export const OurTeam: Block = {
  slug: 'our-team', // Unique identifier for the block
  fields: [
    {
      name: 'attorney_profiles',
      label: 'Attorney Profiles',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
    },
  ],
}
