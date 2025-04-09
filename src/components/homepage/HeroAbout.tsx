'use client'
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { Users, BarChart2, ChevronRight } from 'lucide-react'

interface AboutUsBlockProps {
  block: {
    heading: string
    description: string
    experience?: number
    clients?: number
    photos: { about_photo: { url: string } }[]
  }
}

export default function HeroAboutSection({ block }: AboutUsBlockProps) {
  const heading = block?.heading || 'About Our Law Firm'
  const description =
    block?.description ||
    'With decades of combined experience, our attorneys provide strategic counsel and aggressive advocacy tailored to your unique legal challenges.'
  const experience = block.experience || '12'
  const clients = block.clients || '20'
  const photos = block.photos || []

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

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="xl:container mx-auto px-4 md:px-16 xl:px-4">
        <motion.div
          className="flex flex-col lg:flex-row gap-12 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          {/* Images Column */}
          <motion.div variants={fadeInUp} className="lg:w-5/12">
            <div className="relative">
              {photos.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className={`relative ${index === 0 ? 'mt-16' : '-mt-8'}`}>
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src={photo.about_photo.url}
                          alt="Team member"
                          width={300}
                          height={400}
                          className="object-cover w-full h-full aspect-[3/4] border-4 border-[#deeaaa]"
                        />
                      </div>
                      {index === 0 && (
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#b4d23d] flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-2xl">{experience}+</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-16">
                    <div className="bg-gray-200 rounded-lg h-80 w-full overflow-hidden shadow-lg">
                      <div className="w-full h-full bg-[#13589e]/10"></div>
                    </div>
                  </div>
                  <div className="-mt-8">
                    <div className="bg-gray-200 rounded-lg h-80 w-full overflow-hidden shadow-lg">
                      <div className="w-full h-full bg-[#13589e]/10"></div>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#b4d23d] flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-2xl">{experience}+</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div variants={fadeInUp} className="lg:w-7/12">
            <div className="flex flex-col">
              <span className="text-[#b4d23d] font-medium mb-2">ABOUT US</span>
              <h2 className="text-4xl font-bold text-[#13589e] mb-6">{heading}</h2>
              <div className="bg-[#13589e] h-1 w-16 mb-6"></div>

              <div className="text-gray-700 space-y-4 mb-8">
                <p>{description}</p>
                <p>
                  At Vivid Analytics, we transform data into actionable insights. Our team of
                  experts combines technical expertise with business acumen to deliver solutions
                  that drive growth and innovation.
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-[#13589e]/10 rounded-lg">
                    <BarChart2 size={28} className="text-[#13589e]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#13589e]">{experience}+</h3>
                    <p className="text-gray-600">Years of Experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-[#b4d23d]/20 rounded-lg">
                    <Users size={28} className="text-[#b4d23d]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#13589e]">{clients}+</h3>
                    <p className="text-gray-600">Happy Clients</p>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#13589e] font-medium hover:text-[#b4d23d] transition-colors mt-4 group"
              >
                Learn more about our approach
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
