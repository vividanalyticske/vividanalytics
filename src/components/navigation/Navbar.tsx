'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Home, Puzzle, Briefcase, Info, PenLine, Mail } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 py-2 border-b-2 border-[#13589e] ${
        scrolled ? 'bg-white shadow-md' : 'bg-white bg-opacity-95'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/officialLogo.png" alt="Logo" width={120} height={120} className="mr-2" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-[#13589e] hover:text-[#b4d23d] flex items-center space-x-1"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              href="/solutions"
              className="text-[#13589e] hover:text-[#b4d23d] flex items-center space-x-1"
            >
              <Puzzle size={18} />
              <span>Solutions</span>
            </Link>
            <Link
              href="/practice-areas"
              className="text-[#13589e] hover:text-[#b4d23d] flex items-center space-x-1"
            >
              <Briefcase size={18} />
              <span>Practice Areas</span>
            </Link>
            <Link
              href="/about-us"
              className="text-[#13589e] hover:text-[#b4d23d] flex items-center space-x-1"
            >
              <Info size={18} />
              <span>About Us</span>
            </Link>
            <Link
              href="/blog"
              className="text-[#13589e] hover:text-[#b4d23d] flex items-center space-x-1"
            >
              <PenLine size={18} />
              <span>Blog</span>
            </Link>
            <Link
              href="/contact-us"
              className="bg-[#b4d23d] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-[#13589e] hover:text-[#b4d23d] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-[#13589e] hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <Link
              href="/solutions"
              className="text-[#13589e] hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Puzzle size={18} className="mr-2" />
              Solutions
            </Link>
            <Link
              href="/practice-areas"
              className="text-[#13589e] hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Briefcase size={18} className="mr-2" />
              Practice Areas
            </Link>
            <Link
              href="/about"
              className="text-[#13589e] hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Info size={18} className="mr-2" />
              About Us
            </Link>
            <Link
              href="/blog"
              className="text-[#13589e] hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <PenLine size={18} className="mr-2" />
              Blog
            </Link>
            <Link
              href="/contact"
              className="bg-[#b4d23d] text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              <Mail size={18} className="inline mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
