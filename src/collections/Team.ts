import { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    description: 'Add Team Member',
    group: 'Team Collection',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(value, { lower: true, strict: true })
            if (data?.name) return slugify(data.name, { lower: true, strict: true })
            return value
          },
        ],
      },
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
  ],
}

export default Team
