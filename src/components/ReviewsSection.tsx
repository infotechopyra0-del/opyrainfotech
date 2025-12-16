export default function ReviewsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-brown-50 to-brown-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-brown-800 mb-4 creative-text">
            <span className="diagonal-text bg-brown-600 text-white px-4 py-2">Client Reviews</span>
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            See what our satisfied clients say about our services
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Overall Rating */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-brown-200">
            <div className="text-4xl mb-3">⭐</div>
            <div className="text-3xl font-black text-brown-800 mb-2">4.9/5</div>
            <p className="text-brown-600 font-bold text-sm">Average Rating</p>
            <p className="text-gray-500 text-xs mt-1">Based on 50+ Reviews</p>
          </div>
          
          {/* Total Reviews */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-brown-200">
            <div className="text-4xl mb-3">💬</div>
            <div className="text-3xl font-black text-brown-800 mb-2">50+</div>
            <p className="text-brown-600 font-bold text-sm">Happy Clients</p>
            <p className="text-gray-500 text-xs mt-1">Across All Platforms</p>
          </div>
          
          {/* Trustpilot */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-brown-200 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-bold text-brown-800 mb-3">Trustpilot</h3>
            <a 
              href="https://www.trustpilot.com/review/opyrainfotech.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors inline-block"
            >
              View Reviews
            </a>
          </div>
          
          {/* Google Reviews */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-brown-200 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="font-bold text-brown-800 mb-3">Google Reviews</h3>
            <a 
              href="https://g.page/r/CQxYzKzKzKzKzKzKEB0/review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors inline-block"
            >
              View Reviews
            </a>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Love our work? Help others discover our services by leaving a review!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.trustpilot.com/review/opyrainfotech.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
            >
              <span>📋</span>
              Leave Trustpilot Review
            </a>
            
            <a 
              href="https://g.page/r/CQxYzKzKzKzKzKzKEB0/review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
            >
              <span>🌟</span>
              Leave Google Review
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}