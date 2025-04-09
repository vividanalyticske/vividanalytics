import { Hero } from '@/blocks/homepage/hero/schema'
import { LogosSection } from '@/blocks/homepage/logos-section/schema'
import { HeroAbout } from '@/blocks/homepage/home-about/schema'

import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      blocks: [Hero, LogosSection, HeroAbout],
    },
  ],
}
