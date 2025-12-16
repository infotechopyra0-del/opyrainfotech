'use client'

import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <section className="py-16 bg-brown-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-poppins font-black text-white mb-8 tracking-wide heading-sharp uppercase">
              Have a Project on Mind?
            </h2>
            <p className="text-brown-100 text-lg mb-10 leading-relaxed font-roboto font-light tracking-wide">
              We can help you bring your ideas to life. Let's talk about what we can build and raise together.
            </p>
            <a 
              href="https://wa.me/916390057777?text=Hi, I would like to schedule a call to discuss my project requirements." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-brown-700 px-10 py-4 rounded-none font-roboto font-black tracking-wide uppercase hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-sharp-xl btn-sharp inline-block text-center"
            >
              Schedule a Call
            </a>
          </div>
          
          <div className="bg-white p-10 rounded-none shadow-sharp-xl">
            <h3 className="text-2xl font-roboto font-black text-brown-800 mb-8 tracking-wide uppercase heading-sharp">
              Let us together build a flourishing business
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed font-roboto font-light tracking-wide">
              When connected with us, you aren't growing your business alone. We have your back and put in our best 
              to contribute to the growth of your entire team and organization.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-roboto font-bold text-brown-800 mb-3 tracking-wide uppercase">
                  Subscribe to our newsletter
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="w-full px-4 py-4 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 font-roboto tracking-wide uppercase text-sm font-medium"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brown-700 text-white px-6 py-4 rounded-none hover:bg-brown-800 transition-all duration-300 font-roboto font-bold tracking-wide uppercase btn-sharp shadow-sharp-md"
              >
                I'm Interested
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}