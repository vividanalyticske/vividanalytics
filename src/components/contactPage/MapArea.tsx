import React from 'react'

interface MapProps {
  block: {
    iframe: string
  }
}

export default function MapArea({ block }: MapProps) {
  return (
    <section className="border-t-6 border-[#deeaaa]">
      <div className="iframe-wrapper" dangerouslySetInnerHTML={{ __html: block.iframe }} />
    </section>
  )
}
