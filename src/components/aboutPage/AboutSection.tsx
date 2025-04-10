import React from 'react'
import Image from 'next/image'
import { ChevronRight, Users, BarChart2, Award, Clock } from 'lucide-react'

interface AboutProps {
  block: {
    heading: string
    description: string
    photo: { url: string }
  }
}

export default function AboutSection({ block }: AboutProps) {
  const heading = block?.heading || 'About Vivid Analytics'
  const description =
    block?.description ||
    'We are a leading data analytics company dedicated to transforming complex data into actionable insights that drive business success.'
  const photoUrl = block?.photo?.url

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="xl:container mx-auto px-4 md:px-8 xl:px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Column - Image and Stats */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="relative">
              {/* Image container with decorative elements */}
              <div className="relative z-10">
                {photoUrl ? (
                  <div className="rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src={photoUrl}
                      alt="About Vivid Analytics"
                      width={600}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-xl overflow-hidden shadow-xl bg-gray-200 aspect-[4/3]"></div>
                )}

                {/* Decorator dot pattern */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gray-100 rounded-full z-0"></div>
                <div className="absolute top-1/2 -left-8 w-16 h-16 bg-[#b4d23d]/20 rounded-full z-0"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="max-w-xl">
              <div className="inline-block px-4 py-1 bg-[#13589e]/10 rounded-full mb-4">
                <span className="text-[#13589e] font-medium text-sm">About Us</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#13589e] mb-6">{heading}</h1>
              <div className="h-1 w-16 bg-[#b4d23d] mb-8"></div>

              <div className="space-y-6 text-gray-600">
                <p className="text-lg leading-relaxed">{description}</p>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <div className="bg-[#13589e] h-10 w-10 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">01</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#13589e]">Data Expertise</h3>
                    <p className="text-sm text-gray-500">Industry-leading specialists</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <div className="bg-[#b4d23d] h-10 w-10 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">02</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#13589e]">Client Focus</h3>
                    <p className="text-sm text-gray-500">Tailored to your needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
