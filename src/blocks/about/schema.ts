import { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  fields: [
    { name: 'clause', type: 'textarea', required: true },
    { name: 'photo', label: 'Firm Photo', type: 'upload', relationTo: 'media', required: true },
  ],
}

export const Goals: Block = {
  slug: 'goals',
  fields: [
    { name: 'mission', type: 'textarea', required: true },
    { name: 'vision', type: 'textarea', required: true },
  ],
}

export const OurTeam: Block = {
  slug: 'ourTeam',
  fields: [
    {
      name: 'team_profiles',
      label: 'Member Profiles',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
    },
  ],
}
