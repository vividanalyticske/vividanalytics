'use client'
import React, { useEffect, useState } from 'react'
import { ArrowRight, BarChart2, PieChart, TrendingUp } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import DataVisual from './DesignObjects/DataVisual'

interface HeroBlockProps {
  block?: {
    heading?: string
    subheading?: string
    hero_image?: { url: string }
  }
}

export default function HeroBlock({ block }: HeroBlockProps) {
  // Default values if props are not provided
  const heading = block?.heading || 'Data-Driven Insights for Strategic Business Decisions'
  const subheading =
    block?.subheading ||
    'Transform your raw data into actionable intelligence with our advanced analytics solutions tailored to your business needs.'
  const heroImage = block?.hero_image?.url || '/api/placeholder/1600/900'

  // State to hold the background image load status
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    { icon: BarChart2, text: 'Comprehensive Data Analysis' },
    { icon: PieChart, text: 'Intuitive Visualizations' },
    { icon: TrendingUp, text: 'Predictive Business Intelligence' },
  ]

  // Setup intersection observer for scroll animations
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  // Preload the hero image when the component mounts
  useEffect(() => {
    const image = new window.Image()
    image.src = heroImage
    image.onload = () => {
      setIsImageLoaded(true)
    }
  }, [heroImage])

  // Rotate through features
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [features.length])

  return (
    <section ref={ref} className="relative min-h-[85vh] overflow-hidden bg-white">
      {/* Abstract shapes in background */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
        {/* Large circle */}
        <motion.div
          className="absolute top-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-[#13589e]/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Small circles */}
        <motion.div
          className="absolute top-[65%] left-[10%] w-[10%] h-[10%] rounded-full bg-[#b4d23d]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />

        <motion.div
          className="absolute top-[25%] left-[5%] w-[5%] h-[5%] rounded-full bg-[#13589e]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M200,200 C300,300 700,200 900,400"
            stroke="#13589e"
            strokeWidth="1"
            strokeOpacity="0.1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
          />
          <motion.path
            d="M300,600 C400,500 600,700 800,500"
            stroke="#b4d23d"
            strokeWidth="1"
            strokeOpacity="0.1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.4 }}
          />
        </svg>
      </div>

      {/* Main content container */}
      <div className="xl:container mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-10 relative">
        {/* Content area - spans 6 columns on large screens */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {/* Company name with accent */}
            <motion.div
              className="flex items-center mb-6"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
            >
              <div className="h-2 w-8 bg-[#b4d23d] mr-3"></div>
              <span className="text-[#13589e] uppercase tracking-wider font-semibold">
                Vivid Analytics
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#13589e] leading-tight"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              {heading}
            </motion.h1>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <p className="text-lg mb-8 text-gray-600 max-w-2xl leading-relaxed">{subheading}</p>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              className="mb-10 max-w-lg overflow-hidden relative border-l-4 border-[#b4d23d] pl-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
              }}
            >
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex items-center py-2"
              >
                {React.createElement(features[currentFeature].icon, {
                  className: 'w-6 h-6 text-[#13589e] mr-3',
                })}
                <span className="text-gray-700 font-medium">{features[currentFeature].text}</span>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#b4d23d]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
              }}
            >
              <Link
                href="/solutions"
                className="bg-[#13589e] hover:bg-[#13589e]/90 text-white px-6 py-3 rounded-md shadow-sm flex items-center justify-center group transition-all duration-300 w-full sm:w-auto"
              >
                Explore Solutions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact-us"
                className="border-2 border-[#13589e] text-[#13589e] hover:bg-[#13589e]/5 px-6 py-3 rounded-md transition-all duration-300 flex items-center justify-center"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side visualization - spans 6 columns on large screens */}
        <div className="hidden lg:flex lg:col-span-6 relative items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                scale: 1,
                transition: { delay: 0.5, duration: 0.8 },
              },
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Abstract data visualization */}
            <DataVisual />

            {/* Floating accent elements */}
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#b4d23d]/50 z-20" />
    </section>
  )
}
