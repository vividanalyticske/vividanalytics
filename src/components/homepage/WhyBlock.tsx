'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle } from 'lucide-react'

interface WhyBlockProps {
  block: {
    name: string
    description: string
    experience?: number
    clients?: number
    why_us_photo: { url: string }
    listings: Array<{
      id: number
      title: string
      content: string
    }>
  }
}

export default function WhyBlock({ block }: WhyBlockProps) {
  const name = block?.name || 'Why Choose Vivid Analytics'
  const description =
    block?.description ||
    'We combine technical expertise with business acumen to deliver data solutions that drive growth.'
  const listings = block?.listings || []
  const photoUrl = block?.why_us_photo

  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Icon map based on listing index
  const getIcon = (index: number) => {
    const icons = [<CheckCircle key="check" className="text-[#b4d23d]" size={24} />]
    return icons[index % icons.length]
  }

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col lg:flex-row gap-12 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          {/* Content Column */}
          <motion.div variants={fadeInUp} className="lg:w-1/2">
            <span className="text-[#b4d23d] font-medium mb-2 inline-block">WHY CHOOSE US</span>
            <h2 className="text-4xl font-bold text-[#13589e] mb-6">{name}</h2>
            <div className="bg-[#13589e] h-1 w-16 mb-8"></div>

            <p className="text-gray-700 mb-10">{description}</p>

            <div className="space-y-8">
              {listings.map((item, index) => (
                <motion.div key={item.id} variants={fadeInUp} className="flex gap-4">
                  <div className="mt-1">{getIcon(index)}</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#13589e] mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div variants={fadeInUp} className="w-1/2 lg:w-1/2">
            <div className="relative">
              {photoUrl ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-[#13589e] transform rotate-6 rounded-lg"></div>
                  <div className="absolute inset-0 bg-[#b4d23d] transform -rotate-3 rounded-lg"></div>
                  <div className="relative overflow-hidden rounded-lg shadow-xl">
                    <Image
                      src={photoUrl.url}
                      alt="Why choose us"
                      width={600}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#13589e]/30 to-transparent"></div>
                  </div>

                  <div className="absolute -right-8 -bottom-8 bg-white p-2 md:p-6 rounded-lg shadow-xl">
                    <div className="flex gap-8">
                      <div className="text-center">
                        <div className="text-xl md:text-4xl font-bold text-[#13589e]">
                          {block?.experience || '12'}+
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 font-medium">
                          Years Experience
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-4xl font-bold text-[#13589e]">
                          {block?.clients || '20'}+
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 font-medium">
                          Happy Clients
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-[#13589e] transform rotate-6 rounded-lg"></div>
                  <div className="absolute inset-0 bg-[#b4d23d] transform -rotate-3 rounded-lg"></div>
                  <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-tr from-[#13589e]/30 to-transparent"></div>
                  </div>

                  <div className="absolute -right-8 -bottom-8 bg-white p-6 rounded-lg shadow-xl">
                    <div className="flex gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#13589e]">
                          {block?.experience || '12'}+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#13589e]">
                          {block?.clients || '20'}+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
