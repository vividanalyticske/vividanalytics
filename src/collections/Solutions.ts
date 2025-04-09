import { CollectionConfig } from 'payload'

export const Solution: CollectionConfig = {
  slug: 'our-solutions',
  admin: {
    useAsTitle: 'title',
    description: 'Add Solution',
    group: 'Solution',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
  ],
}

export default Solution
