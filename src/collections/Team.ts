import { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    description: 'Add Team Member',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'role',
      label: 'Job Role',
      type: 'text',
      required: true,
    },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'text', required: true },
    { name: 'linkedin', label: 'LinkedIn Profile', type: 'text' },
    { name: 'twitter', label: 'Twitter Profile', type: 'text' },
    { name: 'facebook', label: 'Facebook Profile', type: 'text' },
    { name: 'instagram', label: 'Instagram Profile', type: 'text' },
    { name: 'bio', label: 'Member Bio', type: 'textarea', required: true },
    { name: 'experience', label: 'Years of Experience', type: 'number', required: true },
    {
      name: 'languages',
      label: 'Languages',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          label: 'Language Title',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default Team
