'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { toast } from 'sonner'

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      // Check for success flag from API
      if (response.ok && data.success === true) {
        // Show success toast ONLY when database save is successful
        toast.success('Message sent successfully! 🎉', {
          description: "We'll get back to you soon.",
          duration: 5000,
        })
        
        // Reset form state
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        })
      } else {
        // Show error toast when success is false
        toast.error('Failed to send message ❌', {
          description: data.message || data.error || 'Something went wrong. Please try again.',
          duration: 5000,
        })
      }
    } catch (error) {
      // Show error toast for network errors only
      toast.error('Network error ❌', {
        description: 'Please check your connection and try again.',
        duration: 5000,
      })
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-24 pb-16 bg-gradient-to-br from-brown-50 to-brown-100 relative overflow-hidden">
        {/* Background decorative text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="text-[20rem] font-black creative-text select-none">CONTACT</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <span className="diagonal-text bg-brown-600 text-white px-6 py-2 text-lg font-bold creative-text">
                LET'S TALK
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-brown-800 mb-8 creative-text leading-tight">
              <span className="block">CONTACT</span>
              <span className="curved-text italic text-brown-600">Us Today</span>
            </h1>
            
            <div className="relative max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-700 creative-text italic leading-relaxed">
                "Ready to start your 
                <span className="diagonal-text bg-brown-100 px-2 font-bold">project?</span> 
                Get in touch with us today and let's discuss how we can help your business 
                <span className="curved-text font-bold text-brown-700">grow.</span>"
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="relative">
              {/* Creative background element */}
              <div className="absolute -top-8 -left-8 outline-text text-9xl font-black opacity-10">
                GET
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-black text-brown-800 mb-8 creative-text">
                  <span className="diagonal-text bg-brown-100 px-4 py-1">Get In Touch</span>
                </h2>
                
                <p className="text-lg text-gray-700 mb-10 leading-relaxed creative-text italic">
                  We'd love to hear from you. Send us a 
                  <span className="curved-text font-bold text-brown-700">message</span> 
                  and we'll respond as soon as possible.
                </p>
                
                <div className="space-y-8">
                  <div className="group flex items-start transform hover:translate-x-2 transition-transform duration-300">
                    <div className="text-brown-700 text-3xl mr-6 floating-element">📍</div>
                    <div>
                      <h3 className="font-black text-brown-800 text-xl creative-text mb-2">Address</h3>
                      <p className="text-gray-700 text-lg">AIC BUILDING BHU VARANASI 221005, UP INDIA</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start transform hover:translate-x-2 transition-transform duration-300">
                    <div className="text-brown-700 text-3xl mr-6 floating-element">✉️</div>
                    <div>
                      <h3 className="font-black text-brown-800 text-xl creative-text mb-2">Email</h3>
                      <p className="text-gray-700 text-lg">support@opyrainfotech.com</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start transform hover:translate-x-2 transition-transform duration-300">
                    <div className="text-brown-700 text-3xl mr-6 floating-element">📞</div>
                    <div>
                      <h3 className="font-black text-brown-800 text-xl creative-text mb-2">Phone</h3>
                      <p className="text-gray-700 text-lg">+91 63900 57777</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-brown-100 to-brown-200 rounded-2xl transform rotate-1"></div>
              
              <div className="relative bg-white p-10 rounded-lg shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-brown-800 creative-text">
                    <span className="diagonal-text bg-brown-100 px-3 py-1">Send Message</span>
                  </h3>
                </div>
                
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                        required
                        placeholder="Your Name"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                        required
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                        Phone <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                        placeholder="Your Company (Optional)"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                      Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 creative-text resize-none transition-all duration-300"
                      required
                      placeholder="Tell us about your project..."
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  
                  {/* Submit button with loading state */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-4 rounded-none transition-all duration-300 font-bold text-lg creative-text transform shadow-xl ${
                      isSubmitting 
                        ? 'bg-gray-500 cursor-not-allowed' 
                        : 'bg-brown-700 hover:bg-brown-800 hover:scale-105 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        SENDING...
                      </span>
                    ) : (
                      'SEND MESSAGE'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}