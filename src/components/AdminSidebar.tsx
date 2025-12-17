"use client"
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Code, FolderKanban, MessageSquareQuote, Users, Briefcase, Menu, X, LogOut, Sparkles, Star, Zap } from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href: string;
}

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { id: 'portfolio', label: 'Portfolio', icon: FolderKanban, href: '/admin/dashboard/portfolio' },
    { id: 'quote', label: 'Quote', icon: MessageSquareQuote, href: '/admin/dashboard/quote' },
    { id: 'contacts', label: 'Contacts', icon: Users, href: '/admin/dashboard/contacts' },
    { id: 'hireus', label: 'Hire Us', icon: Briefcase, href: '/admin/dashboard/hireus' },
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      window.location.href = '/admin/login';
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-orange-600 to-orange-800 text-white p-3 rounded-xl shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white/80 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 z-40 border-r-4 border-orange-600 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-amber-300 opacity-10 rounded-full blur-3xl"></div>
          
          {/* Logo/Header */}
          <div className="p-6 border-b-2 border-amber-200 bg-gradient-to-br from-orange-600 to-orange-800 relative overflow-hidden">
            <div className="absolute top-0 right-0">
              <Sparkles className="text-white opacity-20" size={60} />
            </div>
            <Link href="/admin/dashboard" className="flex items-center space-x-3 relative z-10">
              <div>
                <h2 className="text-white font-black text-xl flex items-center">
                  OPYRAINFOTECH
                  <Star className="ml-1 text-amber-300" size={16} />
                </h2>
                <p className="text-orange-200 text-xs font-bold tracking-wide">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 relative">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-xl transform scale-105'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 hover:text-orange-700 hover:scale-105'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <Zap size={16} className="animate-pulse" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t-2 border-amber-200 space-y-2 bg-gradient-to-br from-amber-50 to-orange-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 hover:scale-105 transition-all duration-300 shadow-sm"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
