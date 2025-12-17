"use client"
import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  Star,
  Zap,
  Mail,
  Phone,
  Building2,
  Trash2,
  Eye,
  Calendar,
  AlertTriangle,
  DollarSign,
  Clock,
  Tag,
  CheckCircle,
  XCircle,
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

// Quote Type Definition
interface Quote {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  budget: string;
  timeline: string;
  description: string;
  additional_info?: string;
  status: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'rejected' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  adminNotes?: string;
  quotedAmount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  // Fetch quotes from database
  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/quotes');
      
      if (!response.ok) {
        throw new Error('Failed to fetch quotes');
      }
      
      const data: Quote[] = await response.json();
      setQuotes(data);
      
      try {
        if (typeof window !== 'undefined') {
          const w = window as any;
          if (!w.__opyra_quotes_loaded_toast_shown) {
            toast.success('Quote requests loaded successfully! 💼');
            w.__opyra_quotes_loaded_toast_shown = true;
          }
        }
      } catch (e) {
        // ignore
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast.error('Failed to load quote requests', {
        description: 'Please check your database connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter quotes based on search query
  const filteredQuotes = quotes.filter((quote: Quote) => {
    const q = (searchQuery || '').toString().toLowerCase().trim();

    const matchesName = quote.name?.toLowerCase()?.includes(q) ?? false;
    const matchesEmail = quote.email?.toLowerCase()?.includes(q) ?? false;
    const matchesCompany = quote.company?.toLowerCase()?.includes(q) ?? false;
    const matchesPhone = quote.phone?.toString()?.includes(q) ?? false;

    const matchesSearch = matchesName || matchesEmail || matchesCompany || matchesPhone;

    let matchesStatus = true;
    let matchesPriority = true;

    if (filterStatus !== 'all') {
      matchesStatus = quote.status === filterStatus;
    }

    if (filterPriority !== 'all') {
      matchesPriority = quote.priority === filterPriority;
    }

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Open view dialog
  const handleViewClick = (quote: Quote) => {
    setSelectedQuote(quote);
    setViewDialogOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (id: string) => {
    setQuoteToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Confirm delete action
  const handleDeleteConfirm = async () => {
    if (!quoteToDelete) return;

    try {
      const response = await fetch(`/api/quotes/${quoteToDelete}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete quote');
      }
      
      setQuotes((prev) => prev.filter((q) => ((q.id ?? q._id) !== quoteToDelete)));
      
      toast.success('Quote deleted successfully! 🗑️', {
        description: 'The quote request has been removed from your database.',
      });
    } catch (error) {
      console.error('Error deleting quote:', error);
      toast.error('Failed to delete quote', {
        description: 'Please try again later.',
      });
    } finally {
      setDeleteDialogOpen(false);
      setQuoteToDelete(null);
    }
  };

  // Update quote status
  const updateStatus = async (id: string, newStatus: Quote['status']) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      
      setQuotes((prev) => prev.map((q) => 
        ((q.id ?? q._id) === id) ? { ...q, status: newStatus } : q
      ));
      
      toast.success('Status updated! ✅', {
        description: `Quote status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status', {
        description: 'Please try again later.',
      });
    }
  };

  // Update priority
  const updatePriority = async (id: string, newPriority: Quote['priority']) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority: newPriority })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update priority');
      }
      
      setQuotes((prev) => prev.map((q) => 
        ((q.id ?? q._id) === id) ? { ...q, priority: newPriority } : q
      ));
      
      toast.success('Priority updated! 🎯');
    } catch (error) {
      console.error('Error updating priority:', error);
      toast.error('Failed to update priority');
    }
  };

  // Get status color
  const getStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'reviewing': return 'bg-blue-100 text-blue-700';
      case 'quoted': return 'bg-purple-100 text-purple-700';
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: Quote['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-blue-500 text-white';
      case 'low': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 lg:left-72 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-orange-600">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 flex items-center">
                Quote Requests
                <FileText className="ml-2 text-orange-600" size={28} />
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-semibold">Manage all quote requests 💼</p>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="pt-28 p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Quotes List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-amber-200 relative overflow-hidden group sm:mt-28">
          <div className="absolute top-0 left-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Sparkles size={200} className="text-orange-600" />
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-black text-orange-900 flex items-center">
                <FileText className="mr-2 text-orange-600" size={28} />
                Quote Requests
                <Sparkles className="ml-2 text-amber-500" size={22} />
              </h2>
              <button
                onClick={fetchQuotes}
                className="bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Zap size={18} />
                <span>Refresh</span>
              </button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border-2 border-amber-200 rounded-lg font-bold text-gray-700 focus:outline-none focus:border-orange-600"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="quoted">Quoted</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-2 border-2 border-amber-200 rounded-lg font-bold text-gray-700 focus:outline-none focus:border-orange-600"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-bold">Loading quote requests...</p>
              </div>
            )}

            {!loading && filteredQuotes.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  📋
                </div>
                <p className="text-xl font-black text-gray-900 mb-2">No Quote Requests Found</p>
                <p className="text-gray-600 font-semibold">
                  {searchQuery ? 'Try adjusting your search criteria' : 'No quote requests in the database yet'}
                </p>
              </div>
            )}

            {!loading && filteredQuotes.length > 0 && (
              <div className="space-y-4">
                {filteredQuotes.map((quote: Quote, index: number) => {
                  const qid = quote.id ?? quote._id ?? `quote-${index}`;
                  return (
                    <div
                      key={qid}
                      className="group/item bg-gradient-to-r from-amber-50 to-orange-50 hover:from-orange-100 hover:to-amber-100 rounded-xl p-6 border-2 border-amber-200 hover:border-orange-600 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Header Section */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-800 text-white rounded-xl flex items-center justify-center font-black shadow-lg group-hover/item:rotate-12 transition-transform duration-300">
                              {quote.name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div>
                              <h3 className="font-black text-lg text-gray-900 flex items-center">
                                {quote.name}
                                <Star className="ml-2 text-amber-500 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" size={14} />
                              </h3>
                              <div className="flex items-center space-x-2 mt-1 flex-wrap gap-2">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(quote.status)}`}>
                                  {quote.status.toUpperCase()}
                                </span>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getPriorityColor(quote.priority)}`}>
                                  {quote.priority.toUpperCase()}
                                </span>
                                {quote.createdAt && (
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <Calendar size={12} className="mr-1" />
                                    {new Date(quote.createdAt).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-16">
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail size={16} className="text-orange-600" />
                            <span className="font-semibold text-gray-700 break-all">{quote.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone size={16} className="text-orange-600" />
                            <span className="font-semibold text-gray-700">{quote.phone}</span>
                          </div>
                          {quote.company && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Building2 size={16} className="text-orange-600" />
                              <span className="font-semibold text-gray-700">{quote.company}</span>
                            </div>
                          )}
                        </div>

                        {/* Project Details */}
                        <div className="pl-16 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-center space-x-2 text-sm">
                              <DollarSign size={16} className="text-green-600" />
                              <span className="font-bold text-gray-700">Budget:</span>
                              <span className="text-gray-600">{quote.budget}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Clock size={16} className="text-blue-600" />
                              <span className="font-bold text-gray-700">Timeline:</span>
                              <span className="text-gray-600">{quote.timeline}</span>
                            </div>
                          </div>

                          {/* Services */}
                          <div>
                            <p className="text-xs font-bold text-gray-600 mb-2 flex items-center">
                              <Tag size={14} className="mr-1" />
                              Services:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {quote.services?.map((service, i) => (
                                <span key={i} className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Description Preview */}
                          <div className="bg-white/80 rounded-lg p-4 border-2 border-amber-200">
                            <p className="text-sm text-gray-700 font-medium line-clamp-2">
                              {quote.description}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-amber-200">
                          <button
                            onClick={() => handleViewClick(quote)}
                            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                          >
                            <Eye size={16} />
                            <span>View Details</span>
                          </button>

                          <select
                            value={quote.status}
                            onChange={(e) => updateStatus(qid, e.target.value as Quote['status'])}
                            className="px-4 py-2 border-2 border-amber-200 rounded-xl font-bold text-sm focus:outline-none focus:border-orange-600"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="quoted">Quoted</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="completed">Completed</option>
                          </select>

                          <select
                            value={quote.priority}
                            onChange={(e) => updatePriority(qid, e.target.value as Quote['priority'])}
                            className="px-4 py-2 border-2 border-amber-200 rounded-xl font-bold text-sm focus:outline-none focus:border-orange-600"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>

                          <button
                            onClick={() => handleDeleteClick(qid)}
                            className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                          >
                            <Trash2 size={16} />
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

      {/* View Details Dialog */}
      <AlertDialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-orange-200 max-w-3xl max-h-[90vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-2xl font-black text-gray-900">
              <FileText className="mr-2 text-orange-600" size={24} />
              Quote Request Details
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Complete information about the quote request
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedQuote && (
            <div className="space-y-6 py-4">
              {/* Client Information */}
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-3">Client Information</h3>
                <div className="bg-amber-50 rounded-lg p-4 space-y-2">
                  <p><span className="font-bold">Name:</span> {selectedQuote.name}</p>
                  <p><span className="font-bold">Email:</span> {selectedQuote.email}</p>
                  <p><span className="font-bold">Phone:</span> {selectedQuote.phone}</p>
                  {selectedQuote.company && (
                    <p><span className="font-bold">Company:</span> {selectedQuote.company}</p>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-3">Project Details</h3>
                <div className="bg-amber-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="font-bold mb-2">Services Required:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedQuote.services?.map((service, i) => (
                        <span key={i} className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p><span className="font-bold">Budget:</span> {selectedQuote.budget}</p>
                  <p><span className="font-bold">Timeline:</span> {selectedQuote.timeline}</p>
                  <div>
                    <p className="font-bold mb-2">Project Description:</p>
                    <p className="text-gray-700 bg-white p-3 rounded border-2 border-amber-200">
                      {selectedQuote.description}
                    </p>
                  </div>
                  {selectedQuote.additional_info && (
                    <div>
                      <p className="font-bold mb-2">Additional Information:</p>
                      <p className="text-gray-700 bg-white p-3 rounded border-2 border-amber-200">
                        {selectedQuote.additional_info}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Priority */}
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-3">Status & Priority</h3>
                <div className="bg-amber-50 rounded-lg p-4 space-y-2">
                  <p>
                    <span className="font-bold">Status:</span>
                    <span className={`ml-2 text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(selectedQuote.status)}`}>
                      {selectedQuote.status.toUpperCase()}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Priority:</span>
                    <span className={`ml-2 text-xs font-bold px-3 py-1 rounded-full ${getPriorityColor(selectedQuote.priority)}`}>
                      {selectedQuote.priority.toUpperCase()}
                    </span>
                  </p>
                  {selectedQuote.createdAt && (
                    <p><span className="font-bold">Submitted:</span> {new Date(selectedQuote.createdAt).toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setViewDialogOpen(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-2 rounded-lg"
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-orange-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-xl font-black text-gray-900">
              <AlertTriangle className="mr-2 text-red-600" size={24} />
              Delete Quote Request?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-base">
              Are you sure you want to delete this quote request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setDeleteDialogOpen(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-2 rounded-lg"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}