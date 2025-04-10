import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'
import {
  Phone,
  Mail,
  Briefcase,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ChevronRight,
} from 'lucide-react'
import { fetchAllMembers, fetchRelatedMembers } from '@/lib/ourTeamUtils'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function TeamDescription({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'team',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const team_member = docs[0]
  if (!team_member) {
    notFound()
  }

  const relatedMembers = await fetchRelatedMembers(slug)
  const descriptionParagraphs = team_member.bio.split('\n')

  return (
    <section className="bg-white min-h-screen relative overflow-hidden py-20">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-[#13589e] to-[#7aa4c3] transform -skew-y-2 origin-top-left"></div>
      <div className="absolute top-64 right-0 w-48 h-48 rounded-full bg-[#deeaaa] blur-xl opacity-50"></div>
      <div className="absolute bottom-64 left-0 w-64 h-64 rounded-full bg-[#b4d23d] blur-3xl opacity-30"></div>

      {/* Hexagonal patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="hexPattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(0.5)"
          >
            <path
              d="M30 0L60 15L60 45L30 60L0 45L0 15Z"
              fill="none"
              stroke="#13589e"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Profile column */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-8">
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-16 h-16 text-[#b4d23d]">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0L93.3 25L93.3 75L50 100L6.7 75L6.7 25Z"></path>
                  </svg>
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 text-[#13589e]">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0L93.3 25L93.3 75L50 100L6.7 75L6.7 25Z"></path>
                  </svg>
                </div>

                <div className="relative z-10 rounded-lg overflow-hidden border-4 border-white shadow-xl mb-6 aspect-[3/4]">
                  <Image
                    src={
                      typeof team_member.photo === 'object' &&
                      'url' in team_member.photo &&
                      team_member.photo.url
                        ? team_member.photo.url
                        : '/john.jpg'
                    }
                    alt={team_member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#13589e] to-transparent"></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#b4d23d]">
                <h1 className="text-2xl md:text-3xl font-bold text-[#13589e] mb-2">
                  {team_member.name}
                </h1>
                <p className="text-[#7aa4c3] text-lg mb-4">{team_member.role}</p>

                <div className="flex items-center mb-4 text-[#13589e]">
                  <Briefcase className="h-5 w-5 mr-2" />
                  <span className="text-gray-700">
                    <span className="font-bold">{team_member.experience}</span> years experience
                  </span>
                </div>

                <div className="space-y-3 mt-6">
                  <a
                    href={`mailto:${team_member.email}`}
                    className="flex items-center text-[#13589e] hover:text-[#b4d23d] transition-colors"
                  >
                    <div className="bg-[#deeaaa] p-2 rounded-lg mr-3">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700">{team_member.email}</span>
                  </a>
                  <a
                    href={`tel:${team_member.phone}`}
                    className="flex items-center text-[#13589e] hover:text-[#b4d23d] transition-colors"
                  >
                    <div className="bg-[#deeaaa] p-2 rounded-lg mr-3">
                      <Phone className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700">{team_member.phone}</span>
                  </a>
                </div>

                <div className="mt-8">
                  <h3 className="text-[#13589e] font-medium mb-4">Connect</h3>
                  <div className="flex space-x-3">
                    {team_member.linkedin && (
                      <a
                        href={`https://${team_member.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-[#f0f4f8] rounded-lg text-[#13589e] hover:bg-[#13589e] hover:text-white transition-colors"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {team_member.twitter && (
                      <a
                        href={`https://${team_member.twitter}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-[#f0f4f8] rounded-lg text-[#13589e] hover:bg-[#13589e] hover:text-white transition-colors"
                        aria-label="Twitter Profile"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {team_member.facebook && (
                      <a
                        href={`https://${team_member.facebook}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-[#f0f4f8] rounded-lg text-[#13589e] hover:bg-[#13589e] hover:text-white transition-colors"
                        aria-label="Facebook Profile"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {team_member.instagram && (
                      <a
                        href={`https://${team_member.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-[#f0f4f8] rounded-lg text-[#13589e] hover:bg-[#13589e] hover:text-white transition-colors"
                        aria-label="Instagram Profile"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio column */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#deeaaa]/20 rounded-full"></div>
              <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-[#b4d23d]/10 rounded-full"></div>

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#13589e] mb-6">
                  About {team_member.name}
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                  {descriptionParagraphs.map((paragraph: string, index: number) => (
                    <p key={index} className={paragraph.trim() === '' ? 'my-4' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {relatedMembers.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#13589e] mb-6">Team Members</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {relatedMembers.map((member, index) => (
                    <Link key={index} href={`/team/${member.slug}`} className="group">
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-b-2 border-[#b4d23d]">
                        <div className="relative h-52">
                          <Image
                            src={
                              typeof member.photo === 'object' &&
                              'url' in member.photo &&
                              member.photo.url
                                ? member.photo.url
                                : '/john.jpg'
                            }
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#13589e] via-[#13589e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                            <span className="text-white font-medium">View Profile</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-[#13589e] group-hover:text-[#7aa4c3] transition-colors duration-300">
                            {member.name}
                          </h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Link
                    href="/team"
                    className="inline-flex items-center justify-center gap-2 py-2 px-6 bg-[#13589e] hover:bg-[#0c4683] text-white rounded-full transition-colors duration-300"
                  >
                    View All Team Members
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const teamMembers = await fetchAllMembers()
    return teamMembers.map((member) => ({
      id: String(member.slug),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
