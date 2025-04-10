'use client'
import React, { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ServicesBlockProps {
  block: {
    heading?: string
    solutions: {
      id: number
      title: string
      description: string
    }[]
  }
}

export default function HomeServicesSection({ block }: ServicesBlockProps) {
  const heading = block?.heading || 'Helping organizations make smarter decisions'
  const solutions = block?.solutions || []

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === solutions.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? solutions.length - 1 : prev - 1))
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 bg-[#13589e]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="text-center mb-2"
        >
          <motion.h3
            variants={fadeInUp}
            initial="hidden"
            animate={controls}
            className="text-2xl font-medium text-white"
          >
            Our Solutions
          </motion.h3>
          <motion.div variants={fadeInUp} className="flex justify-center">
            <div className="bg-[#b4d23d] h-1 w-24"></div>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-white mt-4 max-w-3xl mx-auto leading-tight"
          >
            {heading}
          </motion.h2>
        </motion.div>

        {solutions.length > 0 && (
          <div className="relative max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-4 md:mb-10">
              <motion.h3
                variants={fadeInUp}
                initial="hidden"
                animate={controls}
                className="text-2xl font-medium text-white"
              ></motion.h3>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={controls}
                className="flex items-center space-x-8 md:space-x-4"
              >
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#b4d23d]"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#b4d23d]"
                >
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            </div>

            <div className="relative overflow-hidden min-h-[360px]">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-full"
                >
                  <div className="bg-white border-2 border-[#b4d23d] rounded-lg shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2">
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <span className="text-[#b4d23d] font-medium mb-4">
                          {`SERVICE ${currentIndex + 1}`}
                        </span>
                        <h4 className="text-2xl font-bold text-[#13589e] mb-4 uppercase">
                          {solutions[currentIndex]?.title}
                        </h4>
                        <p className="text-gray-600 mb-6">{solutions[currentIndex]?.description}</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#13589e]/90 to-[#13589e]/70 p-12 hidden md:flex items-center justify-center">
                        <div className="aspect-square w-32 h-32 rounded-full bg-[#b4d23d]/20 flex items-center justify-center">
                          <div className="aspect-square w-24 h-24 rounded-full bg-[#b4d23d]/40 flex items-center justify-center">
                            <div className="aspect-square w-16 h-16 rounded-full bg-[#b4d23d] flex items-center justify-center text-white font-bold text-2xl">
                              {currentIndex + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
              className="flex justify-center mt-6 md:mt-10 space-x-2"
            >
              {solutions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-[#b4d23d]'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
