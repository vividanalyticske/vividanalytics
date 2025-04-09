'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ChevronUp,
  BarChart2,
} from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      // Here you would typically send the email to your backend
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="bg-gradient-to-br from-[#13589e] to-[#0c3b6e] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <Image src="/logo_white.png" alt="Logo" width={120} height={120} className="mr-2" />
            </div>
            <p className="text-gray-200 mb-6">
              Transforming data into actionable insights for your business growth and success.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-[#b4d23d] mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-200">
                  123 Analytics Drive, Suite 200
                  <br />
                  Data Valley, CA 94103
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-[#b4d23d] mr-2 flex-shrink-0" />
                <p className="text-gray-200">(555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-[#b4d23d] mr-2 flex-shrink-0" />
                <p className="text-gray-200">info@vividanalytics.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-6 relative">
              <span className="bg-[#b4d23d] w-12 h-1 absolute -bottom-2 left-0"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/solutions"
                  className="text-gray-200 hover:text-[#b4d23d] flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-areas"
                  className="text-gray-200 hover:text-[#b4d23d] flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-200 hover:text-[#b4d23d] flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-200 hover:text-[#b4d23d] flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-200 hover:text-[#b4d23d] flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-200 hover:text-[#b4d23d] flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-6 relative">
              <span className="bg-[#b4d23d] w-12 h-1 absolute -bottom-2 left-0"></span>
              Our Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/data-visualization"
                  className="text-gray-200 hover:text-[#b4d23d] flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Data Visualization
                </Link>
              </li>
              <li>
                <Link
                  href="/predictive-analytics"
                  className="text-gray-200 hover:text-[#b4d23d] flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Predictive Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/business-intelligence"
                  className="text-gray-200 hover:text-[#b4d23d] flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Business Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/machine-learning"
                  className="text-gray-200 hover:text-[#b4d23d] flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/data-consulting"
                  className="text-gray-200 hover:text-[#b4d23d] flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Data Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative">
              <span className="bg-[#b4d23d] w-12 h-1 absolute -bottom-2 left-0"></span>
              Stay Updated
            </h3>
            <p className="text-gray-200 mb-4">
              Subscribe to our newsletter for the latest insights and analytics trends.
            </p>
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md text-gray-900 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#b4d23d] text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-all"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[#b4d23d] mt-2 text-sm">Thank you for subscribing!</p>
              )}
            </form>
            <div>
              <h4 className="text-lg font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Vivid Analytics. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-300">
            <Link href="/privacy-policy" className="hover:text-[#b4d23d]">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms-of-service" className="hover:text-[#b4d23d]">
              Terms of Service
            </Link>
            <span>|</span>
            <Link href="/sitemap" className="hover:text-[#b4d23d]">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="bg-[#b4d23d] text-white p-3 rounded-full shadow-lg absolute -top-5 right-8 hover:bg-opacity-90 transition-all"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </footer>
  )
}

export default Footer
