import React from 'react'
import { Mail, Phone, Twitter, Linkedin, Instagram, Clock, Globe } from 'lucide-react'
import Link from 'next/link'

interface ContactSocialsProps {
  block: {
    socials: Array<{
      linkedin?: string
      instagram?: string
      twitter?: string
    }>
    phoneNumbers?: Array<{ phone: string }>
    emailAdd?: Array<{ email: string }>
  }
}

export default function ContactSocials({ block }: ContactSocialsProps) {
  const socialLinks = block.socials[0] || {}

  return (
    <section className="py-16 bg-[#13589e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <div className="w-20 h-1 bg-[#b4d23d] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Social Media Links */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition hover:translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-center bg-[#b4d23d] w-14 h-14 rounded-lg -mt-10 mb-4 mx-auto shadow-md">
              <Globe className="w-7 h-7 text-[#13589e]" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-6">Follow Us</h3>

            <div className="grid grid-cols-2 gap-4">
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300"
                >
                  <Twitter className="mr-2 text-[#b4d23d]" size={20} />
                  <span className="font-medium">Twitter</span>
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300"
                >
                  <Linkedin className="mr-2 text-[#b4d23d]" size={20} />
                  <span className="font-medium">LinkedIn</span>
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300"
                >
                  <Instagram className="mr-2 text-[#b4d23d]" size={20} />
                  <span className="font-medium">Instagram</span>
                </a>
              )}
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-300">Stay updated with our latest news and events</p>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition hover:translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-center bg-[#b4d23d] w-14 h-14 rounded-lg -mt-10 mb-4 mx-auto shadow-md">
              <Phone className="w-7 h-7 text-[#13589e]" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-6">Call Us</h3>

            <div className="space-y-4">
              {block.phoneNumbers && block.phoneNumbers.length > 0 ? (
                block.phoneNumbers.map(({ phone }, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <Phone size={18} className="text-[#b4d23d] mr-3" />
                      <span className="font-medium">{phone}</span>
                    </div>
                    <a
                      href={`tel:${phone.replace(/\D/g, '')}`}
                      className="bg-[#b4d23d] text-[#13589e] font-medium px-3 py-1 rounded-md hover:bg-opacity-90 transition-opacity duration-300"
                    >
                      Call
                    </a>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Phone size={18} className="text-[#b4d23d] mr-3" />
                    <span className="font-medium">(123) 456-7890</span>
                  </div>
                  <a
                    href="tel:1234567890"
                    className="bg-[#b4d23d] text-[#13589e] font-medium px-3 py-1 rounded-md hover:bg-opacity-90 transition-opacity duration-300"
                  >
                    Call
                  </a>
                </div>
              )}

              <div className="bg-white/10 p-4 rounded-lg mt-4">
                <div className="flex items-center">
                  <Clock size={18} className="text-[#b4d23d] mr-3" />
                  <div>
                    <p className="font-medium">Available Hours</p>
                    <p className="text-sm text-gray-300">Mon-Fri: 9AM - 5PM</p>
                    <p className="text-sm text-gray-300">Sat: 10AM - 2PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Addresses */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition hover:translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-center bg-[#b4d23d] w-14 h-14 rounded-lg -mt-10 mb-4 mx-auto shadow-md">
              <Mail className="w-7 h-7 text-[#13589e]" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-6">Email Us</h3>

            <div className="space-y-4">
              {block.emailAdd && block.emailAdd.length > 0 ? (
                block.emailAdd.map(({ email }, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-all duration-300"
                  >
                    <Link href={`mailto:${email}`} className="">
                      <div className="flex items-center">
                        <Mail size={18} className="text-[#b4d23d] mr-3" />
                        <span className="font-medium">{email}</span>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Mail size={18} className="text-[#b4d23d] mr-3" />
                    <span className="font-medium">info@company.com</span>
                  </div>
                  <a
                    href="mailto:info@company.com"
                    className="bg-[#b4d23d] text-[#13589e] font-medium px-3 py-1 rounded-md hover:bg-opacity-90 transition-opacity duration-300"
                  >
                    Email
                  </a>
                </div>
              )}

              <div className="bg-white/10 p-4 rounded-lg mt-4">
                <p className="text-center">
                  <span className="font-medium block mb-2">Response Time</span>
                  <span className="text-sm text-gray-300">
                    We typically respond within 24 hours
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
