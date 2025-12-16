import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brown-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-roboto font-black mb-6 text-brown-200 tracking-wide uppercase">OPYRA INFOTECH</h3>
            <p className="text-brown-300 mb-6 leading-relaxed font-roboto font-light tracking-wide">
              Digital Agency That Thrives on Your Success. We help businesses create remarkable online presence.
            </p>
            <div className="space-y-3 text-brown-300 font-roboto font-light tracking-wide">
              <p>📍AIC BUILDING BHU VARANASI 221005, UP INDIA</p>
              <p>✉️ support@opyrainfotech.com</p>
              <div className="space-y-2">
                <p>
                  <a 
                    href="https://www.trustpilot.com/review/opyrainfotech.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"
                  >
                    ⭐ Trustpilot Reviews
                  </a>
                </p>
                <p>
                  <a 
                    href="https://g.page/r/CQxYzKzKzKzKzKzKEB0/review" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                  >
                    🌟 Google Reviews
                  </a>
                </p>
              </div>
              
              {/* Social Media Links */}
              <div className="pt-4">
                <h5 className="font-roboto font-bold mb-3 text-brown-200 tracking-wide uppercase">Follow Us</h5>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/share/1Ba13pKvc1/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
                    title="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/opyrainfotech?igsh=Nnc5NGVva2Zma2s4" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 transition-all duration-300 transform hover:scale-110"
                    title="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-2.508 0-4.541-2.033-4.541-4.541s2.033-4.541 4.541-4.541 4.541 2.033 4.541 4.541-2.033 4.541-4.541 4.541zm7.119 0c-2.508 0-4.541-2.033-4.541-4.541s2.033-4.541 4.541-4.541 4.541 2.033 4.541 4.541-2.033 4.541-4.541 4.541z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://wa.me/916390057777" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-400 transition-all duration-300 transform hover:scale-110"
                    title="WhatsApp"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-roboto font-black mb-6 text-brown-200 tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-brown-300 hover:text-white transition-colors font-roboto font-medium tracking-wide uppercase">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-brown-300 hover:text-white transition-colors font-roboto font-medium tracking-wide uppercase">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-brown-300 hover:text-white transition-colors font-roboto font-medium tracking-wide uppercase">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-brown-300 hover:text-white transition-colors font-roboto font-medium tracking-wide uppercase">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brown-300 hover:text-white transition-colors font-roboto font-medium tracking-wide uppercase">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-roboto font-black mb-6 text-brown-200 tracking-wide uppercase">Services</h4>
            <ul className="space-y-3 text-brown-300 font-roboto font-medium tracking-wide">
              <li>WEB DESIGN</li>
              <li>WEB DEVELOPMENT</li>
              <li>E-COMMERCE SOLUTIONS</li>
              <li>SOFTWARE DEVELOPMENT</li>
              <li>ERP & CRM SYSTEMS</li>
              <li>DIGITAL MARKETING</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brown-800 mt-12 pt-8 text-center">
          <p className="text-brown-400 font-roboto font-light tracking-wide">
            COPYRIGHT © 2025 OPYRA INFOTECH | POWERED BY OPYRA INFOTECH
          </p>
        </div>
      </div>
    </footer>
  )
}
