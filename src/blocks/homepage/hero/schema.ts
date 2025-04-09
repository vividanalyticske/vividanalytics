import { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  admin: {
    group: 'HomePage',
  },
  fields: [
    { name: 'heading', label: 'Heading', type: 'text', required: true },
    {
      name: 'subheading',
      label: 'SubHeading',
      type: 'textarea',
      required: true,
    },
  ],
}
