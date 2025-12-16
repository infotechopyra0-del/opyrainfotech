import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "TechCorp Solutions",
      category: "Web Development",
      description: "Complete digital transformation with modern web application and CRM system integration.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      liveUrl: "#",
      features: ["Responsive Design", "API Integration", "Dashboard Analytics", "User Management"]
    },
    {
      id: 2,
      title: "Fashion Empire E-commerce",
      category: "E-commerce",
      description: "Modern e-commerce platform with advanced product management and payment gateway integration.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "#",
      features: ["Shopping Cart", "Payment Gateway", "Inventory Management", "Order Tracking"]
    },
    {
      id: 3,
      title: "Hospitality Group Website",
      category: "Business Website",
      description: "Elegant website for restaurant chain with online reservation system and menu management.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
      liveUrl: "#",
      features: ["Online Reservations", "Menu Display", "Location Finder", "Customer Reviews"]
    },
    {
      id: 4,
      title: "Kumar Tech Ventures",
      category: "Corporate Website",
      description: "Professional corporate website with portfolio showcase and client management system.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Vue.js", "Laravel", "MySQL", "Bootstrap"],
      liveUrl: "#",
      features: ["Portfolio Gallery", "Contact Forms", "Team Profiles", "News & Updates"]
    },
    {
      id: 5,
      title: "Sharma Innovations App",
      category: "Mobile Application",
      description: "Cross-platform mobile application for business process management and team collaboration.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React Native", "Firebase", "Redux", "Node.js"],
      liveUrl: "#",
      features: ["Real-time Chat", "Task Management", "File Sharing", "Push Notifications"]
    },
    {
      id: 6,
      title: "Digital Marketing Dashboard",
      category: "Web Application",
      description: "Analytics dashboard for digital marketing campaigns with real-time reporting and insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Angular", "Python", "Django", "Chart.js"],
      liveUrl: "#",
      features: ["Analytics Reports", "Campaign Tracking", "Data Visualization", "Export Tools"]
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-brown-50 to-brown-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black creative-text select-none whitespace-nowrap">WORK</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <span className="diagonal-text bg-brown-600 text-white px-6 py-2 text-lg font-bold creative-text">
                OUR WORK
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-brown-800 mb-8 creative-text leading-tight">
              <span className="block">CREATIVE</span>
              <span className="curved-text italic text-brown-600">Portfolio</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 creative-text italic leading-relaxed mb-6 max-w-4xl mx-auto">
              "Showcasing our 
              <span className="diagonal-text bg-brown-100 px-2 font-bold">digital masterpieces</span> 
              that have helped businesses grow and succeed online."
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-brown-800 mb-8 creative-text">
              <span className="diagonal-text bg-brown-100 px-4 py-2">Featured Projects</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Explore our diverse range of successful projects spanning web development, 
              e-commerce, mobile applications, and digital marketing solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.id} className="group">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 border border-brown-100">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-brown-900 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                        <a 
                          href={project.liveUrl}
                          className="bg-white text-brown-800 px-6 py-2 rounded-lg font-bold hover:bg-brown-100 transition-colors duration-300 inline-block mb-3"
                        >
                          View Project
                        </a>
                        <div className="text-white text-sm">
                          <span className="bg-brown-600 px-2 py-1 rounded text-xs font-bold">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-brown-600 text-sm font-bold creative-text">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-black text-brown-800 mb-3 creative-text">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed creative-text">
                      {project.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-brown-700 mb-2">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {project.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-600">
                            <span className="text-brown-600 mr-1">✓</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="bg-brown-100 text-brown-800 px-2 py-1 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brown-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-brown-800 mb-4 creative-text">
              <span className="curved-text">Project Statistics</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">🚀</div>
                <div className="text-3xl font-black text-brown-800 mb-2">50+</div>
                <div className="text-brown-600 font-medium">Projects Delivered</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">💼</div>
                <div className="text-3xl font-black text-brown-800 mb-2">40+</div>
                <div className="text-brown-600 font-medium">Happy Clients</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">⭐</div>
                <div className="text-3xl font-black text-brown-800 mb-2">4.9</div>
                <div className="text-brown-600 font-medium">Average Rating</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">🏆</div>
                <div className="text-3xl font-black text-brown-800 mb-2">12+</div>
                <div className="text-brown-600 font-medium">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brown-100 to-brown-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-1/4 left-1/4 outline-text text-4xl sm:text-6xl md:text-8xl font-black opacity-5">
            CTA
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <span className="diagonal-text bg-brown-600 text-white px-6 py-2 text-lg font-bold creative-text">
                START YOUR PROJECT
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-brown-800 mb-8 creative-text leading-tight">
              <span className="block">Ready to Start</span>
              <span className="curved-text italic text-brown-600">Your Project?</span>
            </h2>
            
            <p className="text-xl text-gray-700 mb-10 creative-text italic leading-relaxed max-w-3xl mx-auto">
              Let's create something 
              <span className="diagonal-text bg-brown-100 px-2 font-bold">amazing together</span>. 
              Contact us today to discuss your project requirements and get a free consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://wa.me/916390057777?text=Hi, I saw your portfolio and would like to discuss my project requirements." 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-brown-700 text-white px-10 py-4 text-xl font-bold creative-text transform -rotate-1 hover:rotate-0 transition-all duration-300 shadow-2xl inline-block text-center"
              >
                <span className="relative z-10">GET STARTED</span>
                <div className="absolute inset-0 bg-brown-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              
              <a 
                href="/contact"
                className="relative bg-transparent border-2 border-brown-700 text-brown-700 px-10 py-4 text-xl font-bold creative-text transform rotate-1 hover:rotate-0 transition-all duration-300 hover:bg-brown-700 hover:text-white inline-block text-center"
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}