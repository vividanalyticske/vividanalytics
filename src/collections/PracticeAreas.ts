import { CollectionConfig } from 'payload'

export const PracticeAreas: CollectionConfig = {
  slug: 'practice-areas',
  admin: {
    useAsTitle: 'title',
    description: 'Add Practice Area',
    group: 'Practice Areas',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
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

export default PracticeAreas
