import { CollectionConfig } from 'payload'

export const Solution: CollectionConfig = {
  slug: 'our-solutions',
  admin: {
    useAsTitle: 'title',
    description: 'Add Solution',
    group: 'Solution',
  },
  access: {
    read: () => true,
    delete: () => true,
    create: () => true,
    update: () => true,
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
