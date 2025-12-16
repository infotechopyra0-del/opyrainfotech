'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/logos/opyralogor.png" 
                alt="Opyra Infotech - Main Logo" 
                className="h-28 object-contain"
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 flex-shrink-0">
            <Link href="/" className="px-3 py-2 text-sm font-medium transition-colors duration-300 creative-text uppercase text-brown-700 hover:text-brown-900">
              Home
            </Link> 
            <Link href="/services" className="px-3 py-2 text-sm font-medium transition-colors duration-300 creative-text uppercase text-brown-700 hover:text-brown-900">
              Services
            </Link>
            <Link href="/software" className="px-3 py-2 text-sm font-medium transition-colors duration-300 creative-text uppercase text-brown-700 hover:text-brown-900">
              Software
            </Link>
            <Link href="/portfolio" className="px-3 py-2 text-sm font-medium transition-colors duration-300 creative-text uppercase text-brown-700 hover:text-brown-900">
              Portfolio
            </Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-medium transition-colors duration-300 creative-text uppercase text-brown-700 hover:text-brown-900">
              Contact
            </Link>
            <Link href="/about" className="px-3 py-2 text-sm font-medium transition-colors duration-300 creative-text uppercase text-brown-700 hover:text-brown-900">
              About
            </Link>
            <Link href='/quote' className="px-6 py-2 font-bold text-sm uppercase transition-all duration-300 transform hover:scale-105 shadow-xl creative-text bg-brown-700 text-white hover:bg-brown-800">
              Get A Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset text-brown-700 hover:text-brown-900 hover:bg-brown-100 focus:ring-brown-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg border-t bg-white border-brown-100">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 creative-text text-brown-700 hover:text-brown-900 hover:bg-brown-100">
            Home
          </Link>
          <Link href="/services" className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 creative-text text-brown-700 hover:text-brown-900 hover:bg-brown-100">
            Services
          </Link>
          <Link href="/software" className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 creative-text text-brown-700 hover:text-brown-900 hover:bg-brown-100">
            Software
          </Link>
          <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 creative-text text-brown-700 hover:text-brown-900 hover:bg-brown-100">
            Contact
          </Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 creative-text text-brown-700 hover:text-brown-900 hover:bg-brown-100">
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}