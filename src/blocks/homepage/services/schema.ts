import { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services-block',
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'practiceAreas',
      label: 'Practice Areas',
      type: 'relationship',
      relationTo: 'practice-areas',
      hasMany: true,
    },
  ],
}
