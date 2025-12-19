"use client"
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link  from 'next/link';

interface Project {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  description: string;
  image: string | { url: string };
  technologies: string[];
  features: string[];
  status?: 'completed' | 'in-progress' | 'on-hold';
  featured?: boolean;
  createdAt?: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stats, setStats] = useState({
    totalProjects: 0,
    happyClients: 0,
    rating: 4.9,
    experience: 12
  });

  // Fetch projects from backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects?status=completed');
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      setProjects(data);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalProjects: data.length,
        happyClients: Math.floor(data.length * 0.8) // Estimate
      }));
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(projects.map(p => p.category))];

  // Filter projects
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

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
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore our diverse range of successful projects spanning web development, 
              e-commerce, mobile applications, and digital marketing solutions.
            </p>

            {/* Category Filter */}
            {!loading && categories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-brown-700 text-white shadow-lg transform scale-105'
                        : 'bg-brown-100 text-brown-700 hover:bg-brown-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-brown-600 border-t-transparent mb-4"></div>
              <p className="text-gray-600 font-bold">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">No Projects Found</h3>
              <p className="text-gray-600">
                {selectedCategory === 'all' 
                  ? 'No projects available yet.' 
                  : `No projects in "${selectedCategory}" category.`}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const imageUrl = typeof project.image === 'string' 
                  ? project.image 
                  : project.image?.url || '/placeholder.jpg';
                
                return (
                  <div key={project._id || project.id} className="group">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 border border-brown-100">
                      <div className="relative overflow-hidden">
                        <img 
                          src={imageUrl}
                          alt={project.title}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-brown-900 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                            {project.featured && (
                              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                ⭐ Featured
                              </span>
                            )}
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
                        
                        <p className="text-gray-600 mb-4 leading-relaxed creative-text line-clamp-3">
                          {project.description}
                        </p>
                        
                        {project.features && project.features.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-bold text-brown-700 mb-2">Key Features:</h4>
                            <div className="grid grid-cols-2 gap-1">
                              {project.features.slice(0, 4).map((feature, idx) => (
                                <div key={idx} className="flex items-center text-xs text-gray-600">
                                  <span className="text-brown-600 mr-1">✓</span>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech, idx) => (
                              <span 
                                key={idx}
                                className="bg-brown-100 text-brown-800 px-2 py-1 rounded text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                +{project.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
                <div className="text-3xl font-black text-brown-800 mb-2">{stats.totalProjects}+</div>
                <div className="text-brown-600 font-medium">Projects Delivered</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">💼</div>
                <div className="text-3xl font-black text-brown-800 mb-2">{stats.happyClients}+</div>
                <div className="text-brown-600 font-medium">Happy Clients</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">⭐</div>
                <div className="text-3xl font-black text-brown-800 mb-2">{stats.rating}</div>
                <div className="text-brown-600 font-medium">Average Rating</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">🏆</div>
                <div className="text-3xl font-black text-brown-800 mb-2">{stats.experience}+</div>
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
              <Link 
                href="/services" 
                className="group relative overflow-hidden bg-brown-700 text-white px-10 py-4 text-xl font-bold creative-text transform -rotate-1 hover:rotate-0 transition-all duration-300 shadow-2xl inline-block text-center"
              >
                <span className="relative z-10">GET STARTED</span>
                <div className="absolute inset-0 bg-brown-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              
              <Link 
                href="/contact"
                className="relative bg-transparent border-2 border-brown-700 text-brown-700 px-10 py-4 text-xl font-bold creative-text transform rotate-1 hover:rotate-0 transition-all duration-300 hover:bg-brown-700 hover:text-white inline-block text-center"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}