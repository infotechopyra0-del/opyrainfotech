'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      alt: 'Team collaboration and strategy'
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      alt: 'Modern workspace design'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      alt: 'Creative team meeting'
    },
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Digital strategy planning'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <>
    <section className="relative h-screen overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Simple dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-wide creative-text">
            DIGITAL AGENCY THAT THRIVES ON{' '}
            <span className="text-brown-300 font-black">YOUR SUCCESS</span>
          </h1>
          <p className="text-lg md:text-xl text-white mb-10 max-w-4xl mx-auto leading-relaxed opacity-95 tracking-wide creative-text">
            If you are looking for an agency to help you create a remarkable presence online, 
            you've come to the right place. We can help you take your business to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/about" className="bg-brown-700 text-white px-10 py-4 rounded-none text-base font-bold hover:bg-brown-800 transition-all duration-300 transform hover:scale-105 tracking-wide uppercase shadow-xl creative-text">
              Find Out How
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-10 py-4 rounded-none text-base font-bold hover:bg-white hover:text-brown-800 transition-all duration-300 transform hover:scale-105 tracking-wide uppercase shadow-xl creative-text">
              Get A Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    {/* Enhanced Info Section Below Slider */}
    <section className="relative py-20 bg-gradient-to-br from-brown-50 via-white to-brown-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 vertical-text text-brown-200/30 text-xl font-bold">
          EXCELLENCE • INNOVATION • RESULTS
        </div>
        <div className="absolute bottom-1/4 right-1/4 outline-text text-8xl font-black text-brown-100/20">
          DIGITAL
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main heading */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="diagonal-text bg-brown-600 text-white px-6 py-2 text-lg font-bold creative-text">
              WHY CHOOSE US
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-brown-800 mb-8 creative-text leading-tight">
            <span className="block">TRANSFORMING BUSINESSES</span>
            <span className="curved-text italic text-brown-600">Into Digital Leaders</span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-4xl mx-auto creative-text italic leading-relaxed">
            With over 12 years of experience and a team of 40+ certified experts, we deliver 
            <span className="diagonal-text bg-brown-100 px-2 mx-2 font-bold">exceptional results</span> 
            that drive growth and success for businesses worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center group">
            <div className="floating-element bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-brown-600/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
              <div className="text-5xl font-black text-brown-700 mb-2 creative-text">
                <span className="outline-text">12+</span>
              </div>
              <p className="text-brown-600 font-bold creative-text uppercase tracking-wider">Years Experience</p>
            </div>
          </div>
          
          <div className="text-center group">
            <div className="floating-element bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-brown-300/20 rounded-full transform -translate-x-8 translate-y-8"></div>
              <div className="text-5xl font-black text-brown-700 mb-2 creative-text">
                <span className="outline-text">40+</span>
              </div>
              <p className="text-brown-600 font-bold creative-text uppercase tracking-wider">Expert Team</p>
            </div>
          </div>
          
          <div className="text-center group">
            <div className="floating-element bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-12 h-12 bg-brown-500/15 transform -rotate-12 -translate-x-6 -translate-y-6"></div>
              <div className="text-5xl font-black text-brown-700 mb-2 creative-text">
                <span className="outline-text">500+</span>
              </div>
              <p className="text-brown-600 font-bold creative-text uppercase tracking-wider">Projects Delivered</p>
            </div>
          </div>
          
          <div className="text-center group">
            <div className="floating-element bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-brown-400/10 transform rotate-45 translate-x-10 translate-y-10"></div>
              <div className="text-5xl font-black text-brown-700 mb-2 creative-text">
                <span className="outline-text">98%</span>
              </div>
              <p className="text-brown-600 font-bold creative-text uppercase tracking-wider">Client Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Services Preview Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="group">
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 text-brown-100 text-6xl font-black transform rotate-12">🎨</div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-brown-800 mb-4 creative-text">
                  <span className="diagonal-text bg-brown-100 px-3 py-1">Creative Design</span>
                </h3>
                
                <p className="text-gray-700 mb-6 creative-text italic leading-relaxed">
                  Stunning visual designs that capture your brand essence and engage your audience 
                  with modern, responsive layouts.
                </p>
                
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-brown-600 mr-2">✓</span>
                    <span className="creative-text">UI/UX Design</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brown-600 mr-2">✓</span>
                    <span className="creative-text">Brand Identity</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brown-600 mr-2">✓</span>
                    <span className="creative-text">Responsive Design</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 text-brown-100 text-6xl font-black transform rotate-12">🚀</div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-brown-800 mb-4 creative-text">
                  <span className="diagonal-text bg-brown-100 px-3 py-1">Development</span>
                </h3>
                
                <p className="text-gray-700 mb-6 creative-text italic leading-relaxed">
                  Cutting-edge web development using the latest technologies to build fast, 
                  secure, and scalable digital solutions.
                </p>
                
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-brown-600 mr-2">✓</span>
                    <span className="creative-text">Full-Stack Development</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brown-600 mr-2">✓</span>
                    <span className="creative-text">E-commerce Solutions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brown-600 mr-2">✓</span>
                    <span className="creative-text">Custom Applications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 text-brown-100 text-6xl font-black transform rotate-12">📈</div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-brown-800 mb-4 creative-text">
                  <span className="diagonal-text bg-brown-100 px-3 py-1">Marketing</span>
                </h3>
                
                <p className="text-gray-700 mb-6 creative-text italic leading-relaxed">
                  Strategic digital marketing campaigns that drive traffic, generate leads, 
                  and maximize your return on investment.
                </p>
                
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-brown-600 mr-2">✓</span>
                    <span className="creative-text">SEO Optimization</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brown-600 mr-2">✓</span>
                    <span className="creative-text">Social Media Marketing</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-brown-600 mr-2">✓</span>
                    <span className="creative-text">PPC Campaigns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-brown-700 to-brown-800 p-10 rounded-lg shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 outline-text text-6xl font-black text-white">READY?</div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6 creative-text leading-tight">
                <span className="block">Ready to Transform</span>
                <span className="curved-text italic">Your Digital Presence?</span>
              </h3>
              
              <p className="text-xl text-brown-100 mb-8 creative-text italic">
                Join 500+ successful businesses who trust us with their digital growth
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  href="https://wa.me/916390057777?text=Hi, I would like to start a project with Opyra Infotech." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-white text-brown-800 px-10 py-4 text-xl font-bold creative-text transform hover:scale-105 transition-all duration-300 shadow-xl inline-block text-center"
                >
                  <span className="relative z-10">START YOUR PROJECT</span>
                  <div className="absolute inset-0 bg-brown-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
                
                <Link 
                  href="/portfolio"
                  className="bg-transparent border-2 border-white text-white px-10 py-4 text-xl font-bold creative-text transform hover:scale-105 transition-all duration-300 hover:bg-white hover:text-brown-800 inline-block text-center"
                >
                  VIEW PORTFOLIO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
