"use client"
import React, { useState, useEffect } from 'react';
import {
  Users,
  Sparkles,
  Star,
  Zap,
  Mail,
  Phone,
  Building2,
  MessageCircle,
  Search,
  Filter,
  Trash2,
  Eye,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Contact Type Definition
interface Contact {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  status: 'pending' | 'replied';
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  // Fetch contacts from database
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/contacts');

      if (response.status === 401) {
        // Not authenticated — redirect to home/login
        window.location.href = '/';
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data: Contact[] = await response.json();
      setContacts(data);
      try {
        if (typeof window !== 'undefined') {
          const w = window as any;
          if (!w.__opyra_contacts_loaded_toast_shown) {
            toast.success('Contacts loaded successfully! 📬');
            w.__opyra_contacts_loaded_toast_shown = true;
          }
        }
      } catch (e) {
        // ignore
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts', {
        description: 'Please check your database connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact: Contact) => {
    const q = (searchQuery || '').toString().toLowerCase().trim();

    const matchesName = contact.name?.toLowerCase()?.includes(q) ?? false;
    const matchesEmail = contact.email?.toLowerCase()?.includes(q) ?? false;
    const matchesCompany = contact.company?.toLowerCase()?.includes(q) ?? false;
    const matchesPhone = contact.phone?.toString()?.includes(q) ?? false;

    const matchesSearch = matchesName || matchesEmail || matchesCompany || matchesPhone;

    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && contact.status === filterStatus;
  });

  // Open delete confirmation dialog
  const handleDeleteClick = (id: string) => {
    setContactToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Confirm delete action
  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return;

    try {
      const response = await fetch(`/api/admin/contacts/${contactToDelete}`, {
        method: 'DELETE'
      });

      if (response.status === 401) {
        window.location.href = '/';
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      
      setContacts((prev) => prev.filter((c) => ((c.id ?? c._id) !== contactToDelete)));
      
      toast.success('Contact deleted successfully! 🗑️', {
        description: 'The contact has been removed from your database.',
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact', {
        description: 'Please try again later.',
      });
    } finally {
      setDeleteDialogOpen(false);
      setContactToDelete(null);
    }
  };

  // Cancel delete action
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setContactToDelete(null);
  };

  // Update contact status
  const updateStatus = async (id: string, newStatus: 'pending' | 'replied') => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.status === 401) {
        window.location.href = '/';
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      
      setContacts((prev) => prev.map((c) => 
        ((c.id ?? c._id) === id) ? { ...c, status: newStatus } : c
      ));
      
      if (newStatus === 'replied') {
        toast.success('Marked as replied! ✅', {
          description: 'Contact status has been updated to replied.',
        });
      } else {
        toast.info('Marked as pending! 📝', {
          description: 'Contact status has been updated to pending.',
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status', {
        description: 'Please try again later.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Fixed Header (fixed to viewport; shifts right on large screens to avoid sidebar) */}
      <header className="fixed top-0 left-0 lg:left-72 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-orange-600">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 flex items-center">
                Contact Messages
                <Users className="ml-2 text-orange-600" size={28} />
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-semibold">Manage all customer inquiries 📬</p>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content - keep top padding equal or larger than header height so content is not hidden */}
      <div className="pt-28 p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Contacts List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-amber-200 relative overflow-hidden group sm:mt-28">
          <div className="absolute top-0 left-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Sparkles size={200} className="text-orange-600" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-orange-900 flex items-center">
                <MessageCircle className="mr-2 text-orange-600" size={28} />
                Contact Messages
                <Sparkles className="ml-2 text-amber-500" size={22} />
              </h2>
              <button
                onClick={fetchContacts}
                className="bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Zap size={18} />
                <span>Refresh</span>
              </button>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-bold">Loading contacts...</p>
              </div>
            )}

            {!loading && filteredContacts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  📭
                </div>
                <p className="text-xl font-black text-gray-900 mb-2">No Contacts Found</p>
                <p className="text-gray-600 font-semibold">
                  {searchQuery ? 'Try adjusting your search criteria' : 'No contacts in the database yet'}
                </p>
              </div>
            )}

            {!loading && filteredContacts.length > 0 && (
              <div className="space-y-4">
                {filteredContacts.map((contact: Contact, index: number) => {
                  const cid = contact.id ?? contact._id ?? `contact-${index}`;
                  return (
                    <div
                      key={cid}
                      className="group/item bg-gradient-to-r from-amber-50 to-orange-50 hover:from-orange-100 hover:to-amber-100 rounded-xl p-6 border-2 border-amber-200 hover:border-orange-600 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Contact Info */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-800 text-white rounded-xl flex items-center justify-center font-black shadow-lg group-hover/item:rotate-12 transition-transform duration-300">
                              {contact.name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div>
                              <h3 className="font-black text-lg text-gray-900 flex items-center">
                                {contact.name}
                                <Star className="ml-2 text-amber-500 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" size={14} />
                              </h3>
                              <div className="flex items-center space-x-4 mt-1 flex-wrap">
                                {contact.status && (
                                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                    contact.status === 'replied'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {contact.status.toUpperCase()}
                                  </span>
                                )}
                                {contact.createdAt && (
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <Calendar size={12} className="mr-1" />
                                    {new Date(contact.createdAt).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-16">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail size={16} className="text-orange-600" />
                              <span className="font-semibold text-gray-700 break-all">{contact.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone size={16} className="text-orange-600" />
                              <span className="font-semibold text-gray-700">{contact.phone}</span>
                            </div>
                            {contact.company && (
                              <div className="flex items-center space-x-2 text-sm sm:col-span-2">
                                <Building2 size={16} className="text-orange-600" />
                                <span className="font-semibold text-gray-700">{contact.company}</span>
                              </div>
                            )}
                          </div>

                          {contact.message && (
                            <div className="pl-16 mt-3">
                              <div className="bg-white/80 rounded-lg p-4 border-2 border-amber-200">
                                <p className="text-sm text-gray-700 font-medium">
                                  {contact.message}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex lg:flex-col gap-2">
                          <button 
                            onClick={() => updateStatus(
                              cid, 
                              contact.status === 'pending' ? 'replied' : 'pending'
                            )}
                            className="flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-orange-700 hover:bg-orange-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                          >
                            <Eye size={18} />
                            <span>
                              {contact.status === 'pending' ? 'Mark Replied' : 'Mark Pending'}
                            </span>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(cid)}
                            className="flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                          >
                            <Trash2 size={18} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-orange-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-xl font-black text-gray-900">
              <AlertTriangle className="mr-2 text-red-600" size={24} />
              Delete Contact?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-base">
              Are you sure you want to delete this contact? This action cannot be undone and will permanently remove the contact from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={handleDeleteCancel}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-2 rounded-lg transition-all duration-300"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg transition-all duration-300"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}