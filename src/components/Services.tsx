export default function Services() {
  const services = [
    {
      title: "Design",
      description: "Our web design team has ample years of experience in the core areas of design to build a website that you need.",
      icon: "🎨"
    },
    {
      title: "Development", 
      description: "Looking out for customized solutions for your websites? Our team will develop and deliver a website that'll serve your purpose.",
      icon: "💻"
    },
    {
      title: "E-commerce Management",
      description: "Custom, Single Vendor & Multi Vendor e-commerce solutions on Shopify and WordPress platforms with complete management.",
      icon: "🛒"
    },
    {
      title: "Marketing",
      description: "With researched digital marketing, we will ensure that new customers and clients are able to find your business.",
      icon: "📈"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-black text-brown-800 mb-6 tracking-wide heading-sharp uppercase">
            Hire Us For
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center p-10 rounded-none border-2 border-brown-200 hover:border-brown-400 card-sharp bg-white group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
              <h3 className="text-2xl font-roboto font-black text-brown-800 mb-6 tracking-wide uppercase heading-sharp">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed font-roboto font-light tracking-wide">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}