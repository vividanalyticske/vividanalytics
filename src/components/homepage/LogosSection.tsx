'use client'
import React from 'react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

interface LogoProps {
  block?: {
    company_logos: { logo: { url: string; alt: string } }[]
  }
}

export default function LogosSection({ block }: LogoProps) {
  const logos = block?.company_logos || []

  if (!logos.length) return null

  return (
    <section className="bg-[#13589e] py-0 w-full">
      <div className="mx-auto md:px-4">
        <div className="relative mx-auto">
          <Carousel
            opts={{
              align: 'center',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {logos.map((item, index) => (
                <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/3">
                  <div className="p-4 h-32 flex items-center justify-center group">
                    <div className="relative w-full h-16 transition-all duration-300 transform">
                      <Image
                        fill
                        src={item.logo.url}
                        alt={item.logo.alt}
                        className="object-contain bg-white p-2 rounded-3xl border-2 border-[#b4d23d]"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
