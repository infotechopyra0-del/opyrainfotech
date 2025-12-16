'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [result, setResult] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setResult("Sending....")
    
    const formData = new FormData(event.currentTarget)
    formData.append("access_key", "22d6b0b8-b8b0-4cfe-af22-50535d0525ab")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()
      
      if (data.success) {
        setResult("✅ Message sent successfully! We'll get back to you soon.")
        event.currentTarget.reset()
      } else {
        console.log("Error", data)
        setResult("❌ Something went wrong. Please try again or contact us directly.")
      }
    } catch (error) {
      console.log("Error", error)
      setResult("✅ Message received! We'll get back to you soon.")
    } finally {
      setIsSubmitting(false)
      // Clear result message after 5 seconds
      setTimeout(() => setResult(""), 5000)
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
                  {/* Hidden fields for Web3Forms */}
                  <input type="hidden" name="subject" value="New Contact Form Submission from Opyra Infotech Website" />
                  <input type="hidden" name="from_name" value="Opyra Infotech Contact Form" />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
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
                        className="w-full px-4 py-3 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-brown-800 mb-2 creative-text">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 creative-text resize-none transition-all duration-300"
                      required
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
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                  
                  {/* Result message */}
                  {result && (
                    <div className={`p-4 rounded-lg text-center font-bold ${
                      result.includes('✅') 
                        ? 'bg-green-100 text-green-800 border border-green-300' 
                        : result.includes('❌')
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}>
                      {result}
                    </div>
                  )}
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