import { Block } from 'payload'

export const LogosSection: Block = {
  slug: 'logos-section',
  admin: {
    group: 'HomePage',
  },
  fields: [
    {
      name: 'company_logos',
      label: 'Company Logos',
      type: 'array',
      fields: [
        {
          name: 'logo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
