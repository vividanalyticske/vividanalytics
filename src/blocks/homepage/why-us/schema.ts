import { Block } from 'payload'

export const WhyChooseUs: Block = {
  slug: 'why-choose-us', // Unique identifier for the block
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
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'listings',
      label: 'Choose Us Listings',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'title',
          label: 'Listing Title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          label: 'Listing Content',
          type: 'textarea',
          required: true,
        },
      ],
    },
    { name: 'experience', label: 'Years of Experience', type: 'number', required: true },
    { name: 'clients', label: 'Number of Happy Clients', type: 'number', required: true },
    {
      name: 'why_us_photo',
      label: 'Section Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
