import { Hero } from '@/blocks/homepage/hero/schema'
import { LogosSection } from '@/blocks/homepage/logos-section/schema'
import { HeroAbout } from '@/blocks/homepage/home-about/schema'
import { ServicesBlock } from '@/blocks/homepage/services/schema'
import { WhyChooseUs } from '@/blocks/homepage/why-us/schema'
import { CTA } from '@/blocks/homepage/cta/schema'
import { OurSolutions } from '@/blocks/solutions/schema'
import { About, Goals, OurTeam } from '@/blocks/about/schema'
import { Contact, ContactAddresses, Map } from '@/blocks/contactPage/schema'

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
      blocks: [
        Hero,
        LogosSection,
        HeroAbout,
        ServicesBlock,
        WhyChooseUs,
        CTA,
        OurSolutions,
        About,
        Goals,
        OurTeam,
        Contact,
        ContactAddresses,
        Map,
      ],
    },
  ],
}
