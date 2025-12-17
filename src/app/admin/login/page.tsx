"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Success - redirect to dashboard
        router.push('/admin/dashboard');
      } else {
        // Show error message
        setError(data.message || 'Invalid email or password');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen w-screen bg-gradient-to-br from-amber-50 to-orange-100 relative overflow-hidden flex items-center justify-center">
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <span className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black select-none whitespace-nowrap">
          ADMIN
        </span>
      </div>

      {/* Decorative geometric shapes - Adjusted for mobile */}
      <div className="absolute top-5 left-5 w-12 h-12 sm:w-20 sm:h-20 sm:top-10 sm:left-10 bg-amber-300 opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 sm:w-32 sm:h-32 sm:bottom-20 sm:right-20 bg-orange-600 opacity-10 transform rotate-45"></div>
      <div className="absolute top-1/3 right-5 w-10 h-10 sm:w-16 sm:h-16 sm:right-10 bg-amber-400 opacity-15 transform rotate-12"></div>
      <div className="absolute bottom-1/4 left-10 w-16 h-16 sm:w-24 sm:h-24 sm:left-20 bg-orange-500 opacity-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left side - Branding and info */}
          <div className="hidden lg:block">
            <div className="mb-8">
              <span className="inline-block bg-orange-700 text-white px-6 py-2 text-lg font-bold transform -rotate-2 shadow-lg">
                SECURE ACCESS
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-orange-900 mb-8 leading-tight">
              <span className="block">ADMIN</span>
              <span className="italic text-orange-600">Portal</span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 italic leading-relaxed">
              Welcome back! Sign in to access your 
              <span className="inline-block bg-amber-100 px-2 font-bold mx-2 transform rotate-1">dashboard</span> 
              and manage your content.
            </p>

            <div className="space-y-6 mt-12">
              <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-orange-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4 shadow-lg">
                  🔒
                </div>
                <div>
                  <h3 className="font-black text-orange-900 text-lg">Secure Authentication</h3>
                  <p className="text-gray-600">Protected by industry-leading security</p>
                </div>
              </div>
              
              <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-orange-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4 shadow-lg">
                  ⚡
                </div>
                <div>
                  <h3 className="font-black text-orange-900 text-lg">Fast Access</h3>
                  <p className="text-gray-600">Quick and seamless login experience</p>
                </div>
              </div>
              
              <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-orange-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4 shadow-lg">
                  📊
                </div>
                <div>
                  <h3 className="font-black text-orange-900 text-lg">Full Control</h3>
                  <p className="text-gray-600">Manage everything from one place</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {/* Mobile header - Compact version */}
              <div className="lg:hidden text-center mb-4 sm:mb-6">
                <div className="mb-3">
                  <span className="inline-block bg-orange-700 text-white px-4 py-1.5 text-sm sm:text-base font-bold transform -rotate-2 shadow-lg">
                    ADMIN ACCESS
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-orange-900">
                  <span className="italic text-orange-600">Welcome Back</span>
                </h1>
              </div>

              {/* Login card - Adjusted padding for mobile */}
              <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8 relative overflow-hidden">
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-600 transform rotate-45 translate-x-10 -translate-y-10 opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-300 rounded-full transform -translate-x-8 translate-y-8 opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-5 sm:mb-6">
                    <div className="inline-block mb-3">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-600 to-orange-800 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg">
                        🔐
                      </div>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-orange-900 mb-1 sm:mb-2">
                      Admin Login
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Enter your credentials to continue
                    </p>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-amber-200 rounded-lg focus:border-orange-600 focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all duration-300"
                          placeholder="Enter your email"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base">
                          📧
                        </span>
                      </div>
                    </div>

                    {/* Password Input */}
                    <div>
                      <label htmlFor="password" className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-amber-200 rounded-lg focus:border-orange-600 focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all duration-300"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none text-sm sm:text-base"
                        >
                          {showPassword ? '👁️' : '🔒'}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-600"
                        />
                        <span className="ml-2 text-xs sm:text-sm text-gray-600">Remember me</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 sm:py-3.5 px-6 text-sm sm:text-base rounded-lg transform hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </span>
                      ) : (
                        'SIGN IN'
                      )}
                    </button>

                  </form>

                  {/* Additional info */}
                  <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-200">
                    <p className="text-center text-xs sm:text-sm text-gray-600">
                      Need help? Contact{' '}
                      <a 
                        href="mailto:admin@opyrainfotech.com" 
                        className="text-orange-600 hover:text-orange-800 font-bold transition-colors"
                      >
                        support
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Security badge */}
              <div className="mt-4 sm:mt-5 text-center">
                <div className="inline-flex items-center bg-white rounded-full px-4 py-2 sm:px-5 sm:py-2.5 shadow-lg">
                  <span className="text-green-500 mr-1.5 sm:mr-2 text-base sm:text-lg">✓</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-700">
                    Secured with SSL Encryption
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative text for mobile */}
      <div className="lg:hidden absolute bottom-2 sm:bottom-3 left-0 right-0 text-center opacity-30">
        <span className="text-[10px] sm:text-xs font-bold text-orange-700 tracking-wider">
          OPYRA INFOTECH • ADMIN PORTAL
        </span>
      </div>
    </main>
  );
}