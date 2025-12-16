export default function About() {
  return (
    <section className="py-16 bg-brown-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-poppins font-black text-brown-800 mb-8 tracking-wide heading-sharp uppercase">
              About Us
            </h2>
            <p className="text-lg font-roboto font-light text-gray-600 mb-10 leading-relaxed tracking-wide">
              We are a team of 40 web experts with over 12 years of experience in website building 
              and marketing to help businesses grow online.
            </p>
            
            <div className="space-y-8">
              <div className="border-l-4 border-brown-700 pl-6">
                <h3 className="text-xl font-roboto font-black text-brown-700 mb-4 tracking-wide uppercase heading-sharp">Mission</h3>
                <p className="text-gray-600 leading-relaxed font-roboto font-light tracking-wide">
                  Our mission is to empower our clients to use the internet to its full potential by 
                  providing affordable, effective, custom design and marketing solutions.
                </p>
              </div>
              
              <div className="border-l-4 border-brown-700 pl-6">
                <h3 className="text-xl font-roboto font-black text-brown-700 mb-4 tracking-wide uppercase heading-sharp">Vision</h3>
                <p className="text-gray-600 leading-relaxed font-roboto font-light tracking-wide">
                  Our vision is to become a global leader in providing the best and unique web design 
                  and marketing services to improve our client's productivity and business strength.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-brown-600 rounded-none h-96 flex items-center justify-center overflow-hidden shadow-sharp-xl">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" 
                alt="About Us" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}