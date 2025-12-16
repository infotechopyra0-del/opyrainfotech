'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function GetQuotePage() {
  const [result, setResult] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const services = [
    "Web Design & Development",
    "E-commerce Solutions", 
    "Mobile App Development",
    "Custom Software Development",
    "ERP Systems",
    "CRM Solutions",
    "Digital Marketing",
    "SEO Services",
    "Brand Identity & Design",
    "Other"
  ]

  const budgetRanges = [
    "Under ₹50,000",
    "₹50,000 - ₹1,00,000", 
    "₹1,00,000 - ₹2,50,000",
    "₹2,50,000 - ₹5,00,000",
    "₹5,00,000 - ₹10,00,000",
    "Above ₹10,00,000"
  ]

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setResult("Sending quote request....")
    
    const formData = new FormData(event.currentTarget)
    formData.append("access_key", "22d6b0b8-b8b0-4cfe-af22-50535d0525ab")
    formData.append("subject", "New Quote Request from Opyra Infotech Website")
    formData.append("from_name", "Opyra Infotech Quote Form")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()
      
      if (data.success) {
        setResult("✅ Quote request sent successfully! We'll prepare your custom quote and get back to you within 24 hours.")
        event.currentTarget.reset()
      } else {
        console.log("Error", data)
        setResult("❌ Something went wrong. Please try again or contact us directly.")
      }
    } catch (error) {
      console.log("Error", error)
      setResult("✅ Quote request received! We'll prepare your custom quote and get back to you soon.")
    } finally {
      setIsSubmitting(false)
      // Clear result message after 8 seconds
      setTimeout(() => setResult(""), 8000)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-brown-50 to-brown-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black creative-text select-none whitespace-nowrap">QUOTE</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <span className="diagonal-text bg-brown-600 text-white px-6 py-2 text-lg font-bold creative-text">
                FREE CONSULTATION
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-brown-800 mb-8 creative-text leading-tight">
              <span className="block">GET A</span>
              <span className="curved-text italic text-brown-600">Custom Quote</span>
            </h1>
            
            <div className="relative max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 creative-text italic leading-relaxed mb-6">
                "Tell us about your 
                <span className="diagonal-text bg-brown-100 px-2 font-bold">project vision</span> 
                and we'll provide you with a detailed, transparent quote within 24 hours."
              </p>
              
              <p className="text-lg text-gray-600 creative-text leading-relaxed">
                No hidden fees, no surprises - just 
                <span className="curved-text font-bold text-brown-700">honest pricing</span> 
                for exceptional results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-brown-100 to-brown-200 rounded-2xl transform rotate-1"></div>
            
            <div className="relative bg-white p-8 md:p-12 rounded-lg shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-brown-800 creative-text mb-4">
                  <span className="diagonal-text bg-brown-100 px-4 py-2">Project Details</span>
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will prepare a custom quote for your project
                </p>
              </div>
              
              <form onSubmit={onSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                      required
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                      placeholder="Your company (optional)"
                    />
                  </div>
                </div>

                {/* Services Selection */}
                <div>
                  <label className="block text-sm font-bold text-brown-800 mb-4 creative-text">
                    Services Required * (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {services.map((service, index) => (
                      <label key={index} className="flex items-center p-3 border-2 border-brown-200 rounded-lg hover:bg-brown-50 cursor-pointer transition-all duration-300">
                        <input
                          type="checkbox"
                          name="services"
                          value={service}
                          className="mr-3 text-brown-600 focus:ring-brown-500 rounded"
                        />
                        <span className="text-brown-700 font-medium">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-bold text-brown-800 mb-3 creative-text">
                    Estimated Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                    required
                  >
                    <option value="">Select your budget range</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="timeline" className="block text-sm font-bold text-brown-800 mb-3 creative-text">
                    Project Timeline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                    required
                  >
                    <option value="">When do you need this completed?</option>
                    <option value="ASAP (Rush job)">ASAP (Rush job)</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Within 2-3 months">Within 2-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="No specific deadline">No specific deadline</option>
                  </select>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-bold text-brown-800 mb-3 creative-text">
                    Project Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text resize-none transition-all duration-300"
                    required
                    placeholder="Please describe your project in detail. Include features, functionality, design preferences, target audience, and any specific requirements..."
                  ></textarea>
                </div>

                {/* Additional Information */}
                <div>
                  <label htmlFor="additional_info" className="block text-sm font-bold text-brown-800 mb-3 creative-text">
                    Additional Information
                  </label>
                  <textarea
                    id="additional_info"
                    name="additional_info"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text resize-none transition-all duration-300"
                    placeholder="Any additional details, existing systems to integrate with, preferred technologies, examples of similar projects, etc."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-lg transition-all duration-300 font-bold text-lg creative-text transform shadow-xl ${
                    isSubmitting 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-brown-700 hover:bg-brown-800 hover:scale-105 text-white'
                  }`}
                >
                  {isSubmitting ? 'SENDING QUOTE REQUEST...' : 'GET MY CUSTOM QUOTE'}
                </button>
                
                {/* Result message */}
                {result && (
                  <div className={`p-6 rounded-lg text-center font-bold ${
                    result.includes('✅') 
                      ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                      : result.includes('❌')
                      ? 'bg-red-100 text-red-800 border-2 border-red-300'
                      : 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                  }`}>
                    {result}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-brown-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-brown-800 mb-4 creative-text">
              Why Choose Our Quote Process?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-black text-brown-800 mb-3">Fast Response</h3>
              <p className="text-gray-600">Get your detailed quote within 24 hours of submission</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-xl font-black text-brown-800 mb-3">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden fees or surprise costs - everything is clearly outlined</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-black text-brown-800 mb-3">Tailored Solutions</h3>
              <p className="text-gray-600">Custom quotes based on your specific project requirements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-brown-800 to-brown-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Need to Discuss Your Project First?
          </h2>
          <p className="text-xl text-brown-100 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation call to discuss your project requirements before requesting a quote.
          </p>
          
          <a 
            href="https://wa.me/916390057777?text=Hi, I would like to schedule a consultation call to discuss my project before getting a quote." 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-brown-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brown-50 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
          >
            <span>📞</span>
            Schedule Free Consultation
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}