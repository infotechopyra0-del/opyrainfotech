'use client'

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

type ERPProduct = {
  title: string;
  description: string;
  icon: string;
  downloadLink: string;
  features: string[];
  category: string;
};

const erpProducts: ERPProduct[] = [
  {
    title: 'Business ERP',
    description: "India's First GST Ready Business ERP Software for Supermarkets, Mobile Shops / Computers / Electronics / FMCG Dealers, Retailers / Wholesalers / Manufacturers",
    icon: '💼',
    downloadLink: '/downloads/BusinessERP_Setup.exe',
    features: ['GST Ready', 'Inventory Management', 'Financial Accounting'],
    category: 'Business'
  },
  {
    title: 'Jewellery ERP',
    description: 'ERP Software for Jewelry Shops with Stock Management, Girvi management, Tag Printing, Today Rates, Ordering manage, Sale /Purchase , Financial Accounting & more',
    icon: '💍',
    downloadLink: '/downloads/GoldERP_Setup.exe',
    features: ['Stock Management', 'Girvi Management', 'Tag Printing'],
    category: 'Retail'
  },
  {
    title: 'School ERP 2.0',
    description: 'ERP Software for Schools & Colleges to handle Enquiry, Admission, Fee Management, Library, Attendance, Time Table, Certificates, ID Card, Reminder Letters, Demand.',
    icon: '🏫',
    downloadLink: '/downloads/SchoolERP2_Setup.exe',
    features: ['Student Management', 'Fee Management', 'Attendance'],
    category: 'Education'
  },
  {
    title: 'Hotel ERP',
    description: 'Software for Hotels and Restaurants with K.O.T. Management, Table Booking, Room Rent Service, Billing, Stock Management, Production. Very Easy to operate.',
    icon: '🏨',
    downloadLink: '/downloads/HotelERP_setup.exe',
    features: ['KOT Management', 'Table Booking', 'Room Service'],
    category: 'Hospitality'
  },
  {
    title: 'Lab ERP 2.0',
    description: 'Software For Clinical Labs to maintain record of patients with accurate test reports. Completely customizable with own Tests and formulations.',
    icon: '🧪',
    downloadLink: '/downloads/Lab_ERP2_setup.exe',
    features: ['Patient Records', 'Test Reports', 'Custom Tests'],
    category: 'Healthcare'
  },
  {
    title: 'Retail ERP',
    description: 'ERP Software For Apparels, Footwear, Readymade Garments Retail Showrooms. Completely customizable with own Tests',
    icon: '👕',
    downloadLink: '/downloads/RetailERP_Setup.exe',
    features: ['Inventory Control', 'Size Management', 'Barcode System'],
    category: 'Retail'
  },
  {
    title: 'Milk Man (Unicode)',
    description: 'Software for Milk Dairies maintain farmer record,FAT-SNF-CLR According, 10 Days Bill,Stock,Farmer Summary,Profit Loss,Farmer Bills & more features',
    icon: '🥛',
    downloadLink: '/downloads/Milk Man_setup.exe',
    features: ['Farmer Records', 'Fat-SNF Testing', 'Billing System'],
    category: 'Agriculture'
  },
  {
    title: 'Institute ERP',
    description: 'Software for Institutes to handle Enquiry, Admission, Fee Management, Library, Attendance, Time Table. Certificates, ID Card, Reminder Letters, Demand.',
    icon: '🎓',
    downloadLink: '/downloads/InstitueERP_Setup.exe',
    features: ['Admission Management', 'Course Management', 'Library System'],
    category: 'Education'
  },
  {
    title: 'Finance ERP',
    description: 'Software for Non Banking Finance Companies to maintain customer and hypothecated Vehicle records & more',
    icon: '💳',
    downloadLink: '/downloads/Finance_Setup.exe',
    features: ['Loan Management', 'Vehicle Records', 'EMI Tracking'],
    category: 'Finance'
  },
  {
    title: 'Clinic ERP',
    description: 'E.R.P. Software For Hospitals with IPD, OPD, Billing, Accounting, Medicine Stock, Inventory Stock,Advance Payment & Balance Facility.',
    icon: '💊',
    downloadLink: '/downloads/Clinic_Setup.exe',
    features: ['IPD/OPD Management', 'Medicine Stock', 'Billing System'],
    category: 'Healthcare'
  },
  {
    title: 'Tailor Master',
    description: 'ERP Software for Boutique & Tailor Shop Management,Customer Measurement Record,Try Date & Delivery Record,Pending Orders',
    icon: '🧵',
    downloadLink: '/downloads/TailorMaster_Setup.exe',
    features: ['Measurement Records', 'Order Tracking', 'Delivery Management'],
    category: 'Business'
  },
  {
    title: 'Library',
    description: 'E.R.P. Software For Library with Books Record, Issue, Receipt, Sticker Printing, Library Card, Pending Books List,Book Ledger & User Security',
    icon: '📚',
    downloadLink: '/downloads/Library_Setup.exe',
    features: ['Book Management', 'Issue/Return', 'Library Cards'],
    category: 'Education'
  },
  {
    title: 'Medical ERP',
    description: 'ERP Software For Pharmaceutical Dealers and Distributors (Wholesale and Retail Chemists) with Stock management, Expiry Calculation & much more.',
    icon: '🏥',
    downloadLink: '/downloads/MediCal_Setup.exe',
    features: ['Medicine Stock', 'Expiry Tracking', 'GST Billing'],
    category: 'Healthcare'
  },
];

const SoftwarePage: React.FC = () => {
  const categories = ['All', ...Array.from(new Set(erpProducts.map(product => product.category)))];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? erpProducts 
    : erpProducts.filter(product => product.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white creative-text overflow-hidden">
      <Navbar />
      
      {/* Creative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 text-brown-100 text-9xl font-black transform -rotate-12 opacity-20">SOFTWARE</div>
        <div className="absolute top-40 right-10 text-brown-100 text-6xl font-black transform rotate-12 opacity-15">ERP</div>
        <div className="absolute bottom-20 left-20 text-brown-100 text-7xl font-black transform -rotate-6 opacity-10">SOLUTIONS</div>
        <div className="absolute top-60 left-1/2 text-brown-100 text-5xl font-black transform rotate-45 opacity-15">DIGITAL</div>
      </div>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brown-50 via-white to-amber-50 pt-24 pb-20 px-4 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-brown-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-brown-300 rounded-full opacity-40 animate-pulse delay-100"></div>
          <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-brown-400 rounded-full opacity-50 animate-pulse delay-200"></div>
          
          <div className="inline-block bg-gradient-to-r from-brown-600 to-brown-700 text-white px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase mb-8 shadow-xl transform hover:scale-105 transition-all duration-300">
            ✨ Our Premium ERP Solutions ✨
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-brown-800 mb-8 leading-tight">
            <span className="block transform -skew-y-1">Powerful</span>
            <span className="block text-brown-600 transform skew-y-1">SOFTWARE</span>
            <span className="block text-brown-700 transform -skew-y-1">for Every Industry</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brown-700 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
            Discover our comprehensive range of <span className="font-bold text-brown-800">ERP software solutions</span> designed to 
            <span className="italic"> streamline operations</span>, boost productivity, and drive exponential growth.
          </p>
          
          <div className="text-8xl mb-8 animate-bounce">💻</div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-brown-800">13+</div>
              <div className="text-brown-600 text-sm font-medium">Software Solutions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brown-800">500+</div>
              <div className="text-brown-600 text-sm font-medium">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brown-800">24/7</div>
              <div className="text-brown-600 text-sm font-medium">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brown-800">100%</div>
              <div className="text-brown-600 text-sm font-medium">Customizable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 md:px-16 bg-white border-b-4 border-brown-100 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-brown-800 text-center mb-8">
            <span className="border-b-4 border-brown-600 pb-2">Filter by Category</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-brown-600 to-brown-700 text-white shadow-2xl scale-105'
                    : 'bg-brown-100 text-brown-700 hover:bg-brown-200 hover:shadow-xl'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4 md:px-16 bg-gradient-to-b from-white via-brown-25 to-brown-50 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brown-800 mb-4">
              <span className="inline-block transform -rotate-2">Choose Your</span>
              <span className="inline-block transform rotate-2 text-brown-600 ml-4">Perfect Solution</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-brown-600 to-brown-700 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border-2 border-brown-100 overflow-hidden relative"
              >
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-brown-600 to-transparent opacity-20"></div>
                
                {/* Product Header */}
                <div className="bg-gradient-to-br from-brown-600 via-brown-700 to-brown-800 p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-6"></div>
                  <div className="relative z-10">
                    <div className="text-6xl mb-4 animate-pulse">{product.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{product.title}</h3>
                    <span className="bg-white text-brown-600 px-4 py-2 rounded-full text-sm font-bold tracking-wide">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-8">
                  <p className="text-brown-700 mb-6 text-sm leading-relaxed line-clamp-4">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-brown-800 font-bold mb-3 text-sm tracking-wide uppercase">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="text-brown-600 text-sm flex items-center">
                          <span className="w-2 h-2 bg-gradient-to-r from-brown-500 to-brown-600 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Download Button */}
                  <a
                    href={product.downloadLink}
                    className="w-full bg-gradient-to-r from-brown-600 to-brown-700 text-white py-4 rounded-2xl font-bold text-center block hover:from-brown-700 hover:to-brown-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl uppercase tracking-wide"
                  >
                    🚀 Download Now
                  </a>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brown-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-16 bg-gradient-to-r from-brown-800 via-brown-900 to-brown-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brown-600/20 to-brown-700/20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <span className="text-6xl">🎯</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="block transform -skew-y-1">Need Custom</span>
            <span className="block transform skew-y-1">Software Solutions?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-brown-200 max-w-3xl mx-auto leading-relaxed">
            Can't find the perfect fit? We also develop <span className="font-bold text-white">custom ERP solutions</span> 
            tailored to your specific business needs and industry requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/quote"
              className="bg-white text-brown-800 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-brown-50 transition-all duration-300 transform hover:scale-105 shadow-2xl inline-block text-center"
            >
              🎨 Get Custom Quote
            </a>
            <a 
              href="https://wa.me/916390057777?text=Hi, I would like to contact your sales team regarding custom software solutions." 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-3 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-brown-800 transition-all duration-300 transform hover:scale-105 shadow-2xl inline-block text-center"
            >
              📞 Contact Sales Team
            </a>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-bold">Fast Development</div>
              <div className="text-brown-200 text-sm">Quick delivery times</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔧</div>
              <div className="font-bold">Full Customization</div>
              <div className="text-brown-200 text-sm">Tailored to your needs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-bold">Expert Support</div>
              <div className="text-brown-200 text-sm">24/7 technical assistance</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SoftwarePage;