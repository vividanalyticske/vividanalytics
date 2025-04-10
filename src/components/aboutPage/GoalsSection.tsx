import React from 'react'

interface GoalsBlockProps {
  block: {
    mission: string
    vision: string
  }
}

export default function GoalsSection({ block }: GoalsBlockProps) {
  const mission = block.mission
  const vision = block.vision

  return (
    <section className="bg-[#13589e] text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Our Goals</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white text-[#13589e] rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 duration-300 border-2 border-[#deeaaa]">
            <div className="flex items-center mb-4">
              <div className="bg-[#13589e] p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-[#b4d23d]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold">Our Mission</h3>
            </div>
            <p className="text-gray-700">{mission}</p>
          </div>

          <div className="bg-white text-[#13589e] rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 duration-300 border-2 border-[#deeaaa]">
            <div className="flex items-center mb-4">
              <div className="bg-[#13589e] p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-[#b4d23d]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold">Our Vision</h3>
            </div>
            <p className="text-gray-700">{vision}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
