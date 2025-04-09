'use client'
import React, { useEffect } from 'react'
import { PhoneCall, Scale, BookOpen, ArrowRight, BarChart2, PieChart, Send } from 'lucide-react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface HeroBlockProps {
  block: {
    title: string
    description: string
  }
}

export default function CTABlock({ block }: HeroBlockProps) {
  // Default values if props are not provided
  const heading = block?.title || 'Let Us Help You'
  const subheading =
    block?.description || 'Let us help you navigate the complexities of the legal system.'

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

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border-4 border-[#b4d23d]">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#13589e] to-[#13589e]/90"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#b4d23d]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#b4d23d]/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            {/* Content */}
            <div className="relative z-10 p-12 lg:p-16">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <motion.div
                  className="mb-8 lg:mb-0"
                  initial="hidden"
                  animate={controls}
                  variants={fadeInUp}
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{heading}</h2>
                  <p className="text-white/80 text-lg max-w-xl">{subheading}</p>
                </motion.div>

                <motion.div initial="hidden" animate={controls} variants={fadeInUp}>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 bg-[#b4d23d] text-white px-8 py-4 rounded-lg hover:bg-[#b4d23d]/90 transition-colors shadow-lg group font-medium"
                  >
                    Get Started
                    <Send size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
