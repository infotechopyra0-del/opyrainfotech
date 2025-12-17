"use client"
import React from 'react';
import { TrendingUp, ArrowUpRight, Sparkles, Star, Zap, Activity } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <>
      {/* Fixed Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl shadow-xl border-b-4 border-orange-600">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 flex items-center">
                Dashboard
                <Sparkles className="ml-2 text-orange-600" size={28} />
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-semibold">Welcome back, Admin! 👋</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-2.5 rounded-full border-2 border-green-200 shadow-lg">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-black text-gray-700">Online</span>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-800 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-800 text-white rounded-full flex items-center justify-center font-black shadow-xl cursor-pointer transform hover:scale-110 transition-transform duration-300">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {[
            { label: 'Total Projects', value: '24', icon: '📊', change: '+12%', color: 'from-blue-500 to-blue-700' },
            { label: 'Active Softwares', value: '12', icon: '💻', change: '+8%', color: 'from-green-500 to-green-700' },
            { label: 'Quote Requests', value: '8', icon: '📝', change: '+23%', color: 'from-purple-500 to-purple-700' },
            { label: 'New Contacts', value: '15', icon: '👥', change: '+15%', color: 'from-orange-500 to-orange-700' },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border-2 border-amber-200 hover:border-orange-600 overflow-hidden"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Sparkle Effect */}
              <Star className="absolute top-2 right-2 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={16} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-black text-xs">
                    <TrendingUp size={14} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-2 flex items-center">
                  {stat.value}
                  <Sparkles className="ml-2 text-orange-500 opacity-50" size={20} />
                </h3>
                <p className="text-sm font-bold text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Recent Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quick Stats Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-amber-200 hover:border-orange-600 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
              <Activity size={120} className="text-orange-600" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-orange-900 flex items-center">
                  <Activity className="mr-2 text-orange-600" size={24} />
                  Weekly Activity
                  <Sparkles className="ml-2 text-amber-500" size={18} />
                </h2>
                <span className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 font-black px-4 py-2 rounded-full text-xs border-2 border-orange-300">
                  LIVE
                </span>
              </div>
              <div className="space-y-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                  <div key={day} className="flex items-center space-x-4">
                    <span className="text-sm font-bold text-gray-600 w-12">{day}</span>
                    <div className="flex-1 bg-amber-100 rounded-full h-8 overflow-hidden relative group">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-700 rounded-full flex items-center justify-end px-3 transition-all duration-500 hover:from-orange-600 hover:to-orange-800"
                        style={{ width: `${(index + 1) * 18}%` }}
                      >
                        <span className="text-xs font-black text-white">{(index + 1) * 18}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-amber-200 hover:border-orange-600 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
              <Zap size={120} className="text-orange-600" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-black text-orange-900 mb-6 flex items-center">
                <Zap className="mr-2 text-orange-600" size={24} />
                Quick Actions
                <Star className="ml-2 text-amber-500" size={18} />
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'New Project', icon: '🚀', color: 'from-blue-500 to-blue-700' },
                  { label: 'Add Software', icon: '💻', color: 'from-green-500 to-green-700' },
                  { label: 'View Quotes', icon: '📝', color: 'from-purple-500 to-purple-700' },
                  { label: 'Contacts', icon: '👥', color: 'from-orange-500 to-orange-700' },
                ].map((action, index) => (
                  <button
                    key={index}
                    className="group/btn relative bg-gradient-to-br from-amber-50 to-orange-50 hover:from-orange-100 hover:to-amber-100 rounded-xl p-6 border-2 border-amber-200 hover:border-orange-600 transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={16} className="text-orange-600" />
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-2xl mb-3 shadow-lg mx-auto group-hover/btn:rotate-12 transition-transform duration-300`}>
                      {action.icon}
                    </div>
                    <p className="text-sm font-black text-gray-900 text-center">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-amber-200 hover:border-orange-600 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Sparkles size={200} className="text-orange-600" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-orange-900 mb-6 flex items-center">
              <Zap className="mr-2 text-orange-600" size={28} />
              Recent Activity
              <Sparkles className="ml-2 text-amber-500" size={22} />
            </h2>
            <div className="space-y-4">
              {[
                { title: 'New project request received', time: '2 hours ago', type: 'project', color: 'from-blue-500 to-blue-700' },
                { title: 'Software update completed', time: '5 hours ago', type: 'software', color: 'from-green-500 to-green-700' },
                { title: 'Quote request approved', time: '1 day ago', type: 'quote', color: 'from-purple-500 to-purple-700' },
                { title: 'New contact message', time: '2 days ago', type: 'contact', color: 'from-orange-500 to-orange-700' },
              ].map((item, index) => (
                <div key={index} className="group/item flex items-center justify-between p-5 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-orange-100 hover:to-amber-100 rounded-xl border-2 border-amber-200 hover:border-orange-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center font-black shadow-lg group-hover/item:rotate-12 transition-transform duration-300`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-black text-gray-900 flex items-center">
                        {item.title}
                        <Star className="ml-2 text-amber-500 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" size={14} />
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">{item.time}</p>
                    </div>
                  </div>
                  <button className="flex items-center text-orange-600 hover:text-orange-800 font-black text-sm transform group-hover/item:translate-x-2 transition-transform duration-300">
                    View
                    <ArrowUpRight size={16} className="ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}