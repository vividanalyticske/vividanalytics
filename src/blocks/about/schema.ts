import { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  admin: { group: 'About Page' },
  fields: [
    { name: 'heading', type: 'textarea', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'photo', label: 'Firm Photo', type: 'upload', relationTo: 'media', required: true },
  ],
}

export const Goals: Block = {
  slug: 'goals',
  admin: { group: 'About Page' },

  fields: [
    { name: 'mission', type: 'textarea', required: true },
    { name: 'vision', type: 'textarea', required: true },
  ],
}

export const OurTeam: Block = {
  slug: 'ourTeam',
  admin: { group: 'About Page' },

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
