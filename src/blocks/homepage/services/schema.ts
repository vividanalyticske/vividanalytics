import { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services-block',
  admin: {
    group: 'HomePage',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },

    {
      name: 'solutions',
      label: 'Our Solutions',
      type: 'relationship',
      relationTo: 'our-solutions',
      hasMany: true,
    },
  ],
}
