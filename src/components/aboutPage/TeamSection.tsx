'use client'
import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Users } from 'lucide-react'

// Import shadcn carousel components
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel'

interface TeamBlockProps {
  block: {
    team_profiles: Array<{
      id: number
      slug: string
      name: string
      role: string
      bio: string
      photo: {
        url: string
      }
    }>
  }
}

export default function TeamSection({ block }: TeamBlockProps) {
  const members = block?.team_profiles || []
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

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

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

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
    <section
      ref={ref}
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-white to-[#deeaaa]/30"
    >
      {/* Abstract decorative elements with new color scheme */}
      <div className="absolute top-20 right-10 w-64 h-64 md:w-96 md:h-96 rounded-full bg-[#7aa4c3]/20 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 md:w-120 md:h-120 rounded-full bg-[#b4d23d]/15 blur-3xl" />

      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="team-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#13589e" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#team-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mb-12 md:mb-16 text-center">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-[#b4d23d]/20 text-[#13589e] font-medium text-sm mb-4">
              <Users className="w-4 h-4" />
              <span>Our Brilliant Team</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#13589e] mb-4">Meet The Experts</h2>
            <div className="w-24 h-1 bg-[#b4d23d] mx-auto mb-6"></div>
          </motion.div>

          {/* Carousel section with hexagonal design */}
          <motion.div variants={fadeInUp} className="relative w-full">
            <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
              <CarouselContent className="w-full">
                {members.map((member) => (
                  <CarouselItem
                    key={member.id}
                    className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-0 px-2 md:px-4"
                  >
                    <div className="relative group overflow-hidden h-full">
                      {/* Card with hexagonal accent */}
                      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden border-b-4 border-[#b4d23d] h-full transform transition-transform duration-300 group-hover:-translate-y-2">
                        {/* Hexagonal pattern overlay */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill="#13589e"
                              d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
                            ></path>
                          </svg>
                        </div>

                        <div className="relative h-80 w-full">
                          {member.photo ? (
                            <Image
                              src={member.photo.url}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#f0f5f9] text-[#7aa4c3]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-16 h-16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                            </div>
                          )}

                          {/* Custom gradient overlay with new color scheme */}
                          <div className="absolute inset-x-0 bottom-0 h-32 z-10 bg-gradient-to-t from-[#13589e] via-[#13589e]/70 to-transparent" />

                          {/* Name and role overlay */}
                          <div className="absolute inset-x-0 bottom-0 p-4 text-white z-20 flex flex-col items-center">
                            <h3 className="text-xl md:text-2xl font-bold">{member.name}</h3>
                            <p className="text-base font-medium text-[#deeaaa] mb-1">
                              {member.role}
                            </p>

                            <Link
                              href={`/team/${member.slug}`}
                              className="inline-flex md:hidden items-center text-white text-xs font-medium border border-[#b4d23d] rounded-full px-4 py-1 hover:bg-[#b4d23d] hover:text-[#13589e] transition-colors duration-200"
                              aria-label={`View profile of ${member.name}`}
                            >
                              View profile
                            </Link>
                          </div>

                          {/* Bio overlay on hover with hexagonal accents */}
                          <div className="absolute inset-0 bg-gradient-to-b from-[#13589e]/95 to-[#13589e]/85 hidden md:flex flex-col justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                            {/* Decorative hexagons */}
                            <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
                              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fill="#b4d23d"
                                  d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
                                ></path>
                              </svg>
                            </div>
                            <div className="absolute bottom-4 left-4 w-12 h-12 opacity-20">
                              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fill="#deeaaa"
                                  d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
                                ></path>
                              </svg>
                            </div>

                            <div className="text-white">
                              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                              <p className="text-sm font-medium text-[#b4d23d] mb-4">
                                {member.role}
                              </p>
                              <p className="text-white/90 mb-4 line-clamp-4">{member.bio}</p>
                              <Link
                                href={`/team/${member.slug}`}
                                className="inline-flex items-center justify-center gap-2 text-white font-medium border border-[#b4d23d] rounded-full px-5 py-2 hover:bg-[#b4d23d] hover:text-[#13589e] transition-colors duration-200"
                                aria-label={`View profile of ${member.name}`}
                              >
                                View profile
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                  <path
                                    d="M5 12h14M12 5l7 7-7 7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Previous button - styled with new color scheme */}
              <button
                onClick={() => api?.scrollPrev()}
                className="absolute top-1/2 left-0 -translate-y-1/2 p-2 rounded-r-lg bg-white shadow-lg text-[#13589e] hover:bg-[#13589e] hover:text-white transition-colors z-20 hidden md:block"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next button - styled with new color scheme */}
              <button
                onClick={() => api?.scrollNext()}
                className="absolute top-1/2 right-0 -translate-y-1/2 p-2 rounded-l-lg bg-white shadow-lg text-[#13589e] hover:bg-[#13589e] hover:text-white transition-colors z-50 hidden md:block"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </Carousel>
          </motion.div>

          {/* Carousel indicators/pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === i ? 'bg-[#13589e] w-8' : 'bg-[#7aa4c3]/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
