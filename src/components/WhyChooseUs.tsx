export default function WhyChooseUs() {
  const features = [
    {
      title: "Highly Motivated Team with Innovative Ideas",
      description: "We love what we do and therefore come up with the best possible solutions to help you set and grow online quickly. We are your trusted partners you can count on.",
      image: "💡"
    },
    {
      title: "Expert Experience",
      description: "We have the expertise and knowledge to offer impartial advice and services at an honest price.",
      image: "🎯"
    },
    {
      title: "Client-Focused Approach", 
      description: "With us you'll feel heard. We listen to our client requirements and then select the right solution that fits. We care for your business as our own.",
      image: "🤝"
    }
  ]

  return (
    <section className="py-16 bg-brown-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-black text-brown-800 mb-6 tracking-wide heading-sharp uppercase">
            Why Choose Us?
          </h2>
          <p className="text-lg font-roboto font-light text-gray-600 max-w-4xl mx-auto tracking-wide">
            We are the right team for your business. We have the expertise and knowledge to offer 
            impartial advice and services at an honest price.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-10 rounded-none shadow-sharp-lg text-center card-sharp group border-2 border-brown-100 hover:border-brown-300">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.image}</div>
              <h3 className="text-xl font-roboto font-black text-brown-800 mb-6 tracking-wide uppercase heading-sharp">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed font-roboto font-light tracking-wide">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-poppins font-black text-brown-800 mb-6 tracking-wide uppercase heading-sharp">Your Trusted Partners</h3>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto font-roboto font-light tracking-wide leading-relaxed">
            We take a sincere interest in your business and genuinely want to help your company reach its potential.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-brown-100 p-8 rounded-none overflow-hidden card-sharp group border-2 border-brown-200 hover:border-brown-400">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                alt="Gallery 1" 
                className="w-full h-40 object-cover rounded-none group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="bg-brown-100 p-8 rounded-none overflow-hidden card-sharp group border-2 border-brown-200 hover:border-brown-400">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                alt="Gallery 2" 
                className="w-full h-40 object-cover rounded-none group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="bg-brown-100 p-8 rounded-none overflow-hidden card-sharp group border-2 border-brown-200 hover:border-brown-400">
              <img 
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                alt="Gallery 3" 
                className="w-full h-40 object-cover rounded-none group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}