import { Block } from 'payload'

export const HeroAbout: Block = {
  slug: 'hero-about',
  fields: [
    { name: 'heading', label: 'Heading', type: 'text', required: true },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    { name: 'experience', label: 'Years of Experience', type: 'number', required: true },
    { name: 'clients', label: 'Number of Happy Clients', type: 'number', required: true },
    {
      name: 'photos',
      type: 'array',
      minRows: 2,
      maxRows: 2,
      fields: [
        {
          name: 'about_photo',
          label: 'About Photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
