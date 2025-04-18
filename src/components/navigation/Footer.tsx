'use client'

import { useState } from 'react'
import { Mail, Phone, ArrowRight, ChevronUp, Send, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    // Reset notification states
    setSubscribed(false)
    setAlreadySubscribed(false)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.status === 409) {
        // Show already subscribed notification instead of alert
        setAlreadySubscribed(true)
        setTimeout(() => setAlreadySubscribed(false), 5000)
      } else if (res.ok) {
        setSubscribed(true)
        setEmail('')
        setTimeout(() => setSubscribed(false), 5000)
      } else {
        alert(data.error || 'Something went wrong. Please try again later.')
      }
    } catch (error) {
      alert('Failed to subscribe. Please try again later.')
      console.error(error)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="relative bg-[#13589e] text-white">
      {/* Decorative top border */}
      <div className="h-2 bg-gradient-to-r from-[#9ab534] via-[#b4d23d] to-[#9ab534]"></div>

      {/* Wave separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.05"
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Information */}
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <Image
                src="/logo_white.png"
                alt="Logo"
                width={140}
                height={140}
                className="mr-2 drop-shadow-md"
              />
            </div>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Transforming data into actionable insights for your business growth and success.
            </p>
            <div className="space-y-4">
              <div className="flex items-center group">
                <div className="bg-[#b4d23d] bg-opacity-20 p-2.5 rounded-full mr-4 group-hover:bg-opacity-30 transition-all">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  +254 720 206088
                </p>
              </div>
              <div className="flex items-center group">
                <div className="bg-[#b4d23d] bg-opacity-20 p-2.5 rounded-full mr-4 group-hover:bg-opacity-30 transition-all">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  info@vividanalytics.com
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 relative inline-block">
              Quick Links
              <span className="bg-[#b4d23d] w-12 h-1 absolute -bottom-3 left-0 rounded-full"></span>
            </h3>
            <ul className="grid grid-cols-2 gap-4 mt-2">
              {[
                { href: '/solutions', label: 'Solutions' },
                { href: '/about-us', label: 'About Us' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact-us', label: 'Contact Us' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#b4d23d] flex items-center group transition-all duration-300"
                  >
                    <div className="bg-[#b4d23d] bg-opacity-0 group-hover:bg-opacity-20 p-1 rounded-full mr-3 transition-all duration-300">
                      <ArrowRight className="h-4 w-4 text-[#b4d23d] transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <span className="border-b border-transparent group-hover:border-[#b4d23d] pb-1 transition-all">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 relative inline-block">
              Stay Updated
              <span className="bg-[#b4d23d] w-12 h-1 absolute -bottom-3 left-0 rounded-full"></span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Subscribe to our newsletter for the latest insights and analytics trends.
            </p>
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-5 py-4 pr-14 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b4d23d] focus:ring-opacity-50 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#b4d23d] text-[#13589e] p-2.5 rounded-md hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Subscribe"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>

              {/* Success notification */}
              {subscribed && (
                <div className="mt-4 px-4 py-3 bg-[#b4d23d] bg-opacity-20 rounded-md border-l-4 border-[#b4d23d] animate-fade-in">
                  <p className="text-white text-sm">
                    Thank you for subscribing! We{"'"}ll be in touch soon.
                  </p>
                </div>
              )}

              {/* Already subscribed notification */}
              {alreadySubscribed && (
                <div className="mt-4 px-4 py-3 bg-amber-500 bg-opacity-20 rounded-md border-l-4 border-amber-500 animate-fade-in flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">Already Subscribed</p>
                    <p className="text-white/80 text-sm">
                      This email is already in our subscriber list. Thank you for your continued
                      interest!
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white border-opacity-10 flex justify-center items-center">
          <p className="text-white/80 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Vivid Analytics. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="bg-[#b4d23d] text-[#13589e] p-3 rounded-full shadow-lg absolute -top-6 right-8 hover:bg-white hover:text-[#b4d23d] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Back to top"
      >
        <ChevronUp className="h-6 w-6" />
      </button>

      {/* Add some keyframe animations for the notifications */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </footer>
  )
}

export default Footer
