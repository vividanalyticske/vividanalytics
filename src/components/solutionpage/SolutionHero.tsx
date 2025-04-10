import React from 'react'

export default function SolutionHero() {
  return (
    <section className="w-full bg-[#13589e] relative overflow-hidden pt-20 flex justify-center items-center border-b-2 border-[#b4d23d] min-h-60 md:min-h-80">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-white">Our Solutions</h2>
        <div className="bg-[#b4d23d] h-1 w-16 mt-4"></div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/4 translate-y-1/4"></div>
      </div>
    </section>
  )
}
