import { motion } from 'framer-motion'
import React from 'react'

export default function DataVisual() {
  return (
    <div className="relative w-full aspect-square max-w-xl">
      {/* Main dashboard visual */}
      <div className="absolute inset-0 rounded-xl overflow-hidden shadow-xl border border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-[#13589e]/5 to-white"></div>

        {/* Dashboard visual elements */}
        <div className="absolute inset-0 p-6 flex flex-col">
          <div className="h-2 w-1/3 bg-[#13589e]/20 rounded-full mb-4"></div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="h-2 w-16 bg-[#13589e]/20 rounded-full mb-2"></div>
              <div className="h-8 w-full bg-[#b4d23d]/20 rounded-md"></div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="h-2 w-12 bg-[#13589e]/20 rounded-full mb-2"></div>
              <div className="h-8 w-full bg-[#13589e]/10 rounded-md"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex-grow mb-4">
            <div className="h-2 w-24 bg-[#13589e]/20 rounded-full mb-4"></div>
            <div className="flex items-end h-32 gap-2 pt-4">
              <div className="h-[30%] w-1/12 bg-[#13589e]/40 rounded-t-md"></div>
              <div className="h-[70%] w-1/12 bg-[#13589e]/50 rounded-t-md"></div>
              <div className="h-[50%] w-1/12 bg-[#13589e]/60 rounded-t-md"></div>
              <div className="h-[90%] w-1/12 bg-[#b4d23d]/60 rounded-t-md"></div>
              <div className="h-[60%] w-1/12 bg-[#13589e]/70 rounded-t-md"></div>
              <div className="h-[80%] w-1/12 bg-[#b4d23d]/70 rounded-t-md"></div>
              <div className="h-[40%] w-1/12 bg-[#13589e]/80 rounded-t-md"></div>
              <div className="h-[75%] w-1/12 bg-[#b4d23d]/80 rounded-t-md"></div>
              <div className="h-[60%] w-1/12 bg-[#13589e]/90 rounded-t-md"></div>
              <div className="h-[85%] w-1/12 bg-[#b4d23d]/90 rounded-t-md"></div>
              <div className="h-[45%] w-1/12 bg-[#13589e] rounded-t-md"></div>
              <div className="h-[95%] w-1/12 bg-[#b4d23d] rounded-t-md"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
              <div className="h-1.5 w-8 bg-[#13589e]/20 rounded-full mb-2"></div>
              <div className="h-4 w-full bg-[#13589e]/10 rounded-md"></div>
            </div>
            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
              <div className="h-1.5 w-10 bg-[#13589e]/20 rounded-full mb-2"></div>
              <div className="h-4 w-full bg-[#b4d23d]/20 rounded-md"></div>
            </div>
            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
              <div className="h-1.5 w-6 bg-[#13589e]/20 rounded-full mb-2"></div>
              <div className="h-4 w-full bg-[#13589e]/10 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent elements */}
      <motion.div
        className="absolute -bottom-8 -right-8 w-24 h-24 rounded-lg bg-[#b4d23d]/10 z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#13589e]/10 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </div>
  )
}
