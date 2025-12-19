"use client";
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 sm:w-60 sm:h-60 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-40 h-40 sm:w-60 sm:h-60 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-40 h-40 sm:w-60 sm:h-60 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl w-full">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-orange-200 p-4 sm:p-6 md:p-8 lg:p-10 text-center">
          {/* Animated 404 */}
          <div className="relative mb-3 sm:mb-4 md:mb-6">
            <h1 className="text-7xl sm:text-9xl md:text-[150px] lg:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-bounce">
                😕
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-4 sm:mb-6 md:mb-8 space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-brown-800">
              <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                Oops! Page Not Found
              </span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 font-semibold max-w-2xl mx-auto px-2">
              The page you're looking for doesn't exist. Let's get you back on track!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center mb-4 sm:mb-6 md:mb-8">
            <a
              href="/"
              className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg md:rounded-xl text-sm sm:text-base md:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <Home size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span>Go to Homepage</span>
            </a>
            
            <button
              onClick={() => window.history.back()}
              className="group relative overflow-hidden bg-white border-2 sm:border-3 md:border-4 border-orange-600 text-orange-600 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg md:rounded-xl text-sm sm:text-base md:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center hover:bg-orange-600 hover:text-white"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="border-t-2 border-orange-200 pt-3 sm:pt-4 md:pt-6">
            <p className="text-xs sm:text-sm font-bold text-gray-600 mb-2 sm:mb-3 uppercase tracking-wider">
              Quick Links
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 justify-center">
              <a
                href="/"
                className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-md md:rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-105"
              >
                Home
              </a>
              <a
                href="/about"
                className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-md md:rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-105"
              >
                About
              </a>
              <a
                href="/services"
                className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-md md:rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-105"
              >
                Services
              </a>
              <a
                href="/portfolio"
                className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-md md:rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-105"
              >
                Portfolio
              </a>
              <a
                href="/contact"
                className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-md md:rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-105"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}