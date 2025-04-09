import { Block } from 'payload'

export const OurSolutions: Block = {
  slug: 'solutionblock',
  admin: {
    group: 'Solutions Page',
  },
  fields: [
    {
      name: 'solutions',
      label: 'Our Solutions',
      type: 'relationship',
      relationTo: 'our-solutions',
      hasMany: true,
    },
  ],
}
