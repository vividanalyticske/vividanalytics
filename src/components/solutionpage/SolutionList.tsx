import React from 'react'

interface SolutionsBlockProps {
  block: {
    solutions: {
      title: string
      description: string
    }[]
  }
}

export default function SolutionList({ block }: SolutionsBlockProps) {
  const solutions = block?.solutions || []

  return (
    <section className="py-20 bg-gray-50">
      <div className="xl:container mx-auto px-4 md:px-12 xl:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 border-2 border-[#deeaaa]"
            >
              <div className="p-2 bg-gradient-to-r from-[#13589e] to-[#13589e]/80"></div>
              <div className="p-8">
                <div className="bg-[#b4d23d]/10 rounded-full p-4 inline-block mb-6">
                  <h3 className="text-xl text-[#7aa4c3] font-bold">{index + 1}</h3>
                </div>
                <h3 className="text-xl font-bold text-[#13589e] mb-4">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>
              <div className="px-8 pb-8">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#b4d23d]' : 'bg-gray-200'}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
