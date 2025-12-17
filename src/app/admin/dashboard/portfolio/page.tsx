"use client"
import React, { useState, useEffect } from 'react';
import {
  FolderOpen,
  Sparkles,
  Star,
  Zap,
  Trash2,
  Calendar,
  AlertTriangle,
  Plus,
  Edit,
  X,
  Save,
  Code,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
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

// Project Type Definition
interface Project {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  clientName?: string;
  projectUrl?: string;
  status: 'completed' | 'in-progress' | 'planning';
  featured: boolean;
  completionDate?: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

const categories = [
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'E-commerce',
  'Digital Marketing',
  'Software Development',
  'Branding',
  'SEO',
  'Custom Software',
  'Other'
];

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    title: '',
    category: 'Web Development',
    description: '',
    image: '',
    technologies: [],
    features: [],
    clientName: '',
    projectUrl: '',
    status: 'completed',
    featured: false,
    order: 0
  });
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch projects from database
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects');
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data: Project[] = await response.json();
      setProjects(data);
      
      try {
        if (typeof window !== 'undefined') {
          const w = window as any;
          if (!w.__opyra_projects_loaded_toast_shown) {
            toast.success('Projects loaded successfully! 🎨');
            w.__opyra_projects_loaded_toast_shown = true;
          }
        }
      } catch (e) {
        // ignore
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects', {
        description: 'Please check your database connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary upload preset
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      setImageFile(file);
      
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProject({
          ...currentProject,
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image before saving project
  const handleImageUpload = async (): Promise<string> => {
    if (!imageFile) {
      return currentProject.image || '';
    }
    
    setImageUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(imageFile);
      toast.success('Image uploaded successfully! 📸');
      return imageUrl;
    } catch (error) {
      toast.error('Failed to upload image');
      throw error;
    } finally {
      setImageUploading(false);
    }
  };

  // Filter projects based on search query and category
  const filteredProjects = projects.filter((project: Project) => {
    const q = (searchQuery || '').toString().toLowerCase().trim();
    const matchesSearch = 
      project.title?.toLowerCase()?.includes(q) ||
      project.description?.toLowerCase()?.includes(q) ||
      project.clientName?.toLowerCase()?.includes(q);

    if (filterCategory === 'all') return matchesSearch;
    return matchesSearch && project.category === filterCategory;
  });

  // Open add project dialog
  const handleAddClick = () => {
    setCurrentProject({
      title: '',
      category: 'Web Development',
      description: '',
      image: '',
      technologies: [],
      features: [],
      clientName: '',
      projectUrl: '',
      status: 'completed',
      featured: false,
      order: 0
    });
    setImageFile(null);
    setAddDialogOpen(true);
  };

  // Open edit project dialog
  const handleEditClick = (project: Project) => {
    setCurrentProject(project);
    setImageFile(null);
    setEditDialogOpen(true);
  };

  // Save project (add or edit)
  const handleSaveProject = async () => {
    if (!currentProject.title || !currentProject.category || !currentProject.description) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!currentProject.technologies || currentProject.technologies.length === 0) {
      toast.error('Please add at least one technology');
      return;
    }

    if (!currentProject.features || currentProject.features.length === 0) {
      toast.error('Please add at least one feature');
      return;
    }

    try {
      // Upload image if new file selected
      let imageUrl = currentProject.image;
      if (imageFile) {
        imageUrl = await handleImageUpload();
      }

      if (!imageUrl) {
        toast.error('Please upload a project image');
        return;
      }

      const isEdit = !!(currentProject._id || currentProject.id);
      const url = isEdit 
        ? `/api/projects/${currentProject._id || currentProject.id}` 
        : '/api/projects';
      
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...currentProject,
          image: imageUrl
        })
      });
      
      if (!response.ok) {
        throw new Error(isEdit ? 'Failed to update project' : 'Failed to create project');
      }
      
      const savedProject = await response.json();
      
      if (isEdit) {
        setProjects((prev) => prev.map((p) => 
          ((p.id ?? p._id) === (currentProject.id ?? currentProject._id)) ? savedProject : p
        ));
        toast.success('Project updated successfully! ✅');
      } else {
        setProjects((prev) => [savedProject, ...prev]);
        toast.success('Project added successfully! 🎉');
      }
      
      setEditDialogOpen(false);
      setAddDialogOpen(false);
      setImageFile(null);
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project', {
        description: 'Please try again later.',
      });
    }
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Confirm delete action
  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    try {
      const response = await fetch(`/api/projects/${projectToDelete}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      
      setProjects((prev) => prev.filter((p) => ((p.id ?? p._id) !== projectToDelete)));
      
      toast.success('Project deleted successfully! 🗑️');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  // Add technology
  const addTechnology = () => {
    if (techInput.trim() && !currentProject.technologies?.includes(techInput.trim())) {
      setCurrentProject({
        ...currentProject,
        technologies: [...(currentProject.technologies || []), techInput.trim()]
      });
      setTechInput('');
    }
  };

  // Remove technology
  const removeTechnology = (tech: string) => {
    setCurrentProject({
      ...currentProject,
      technologies: currentProject.technologies?.filter(t => t !== tech) || []
    });
  };

  // Add feature
  const addFeature = () => {
    if (featureInput.trim() && !currentProject.features?.includes(featureInput.trim())) {
      setCurrentProject({
        ...currentProject,
        features: [...(currentProject.features || []), featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  // Remove feature
  const removeFeature = (feature: string) => {
    setCurrentProject({
      ...currentProject,
      features: currentProject.features?.filter(f => f !== feature) || []
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 lg:left-72 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-orange-600">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 flex items-center">
                Portfolio Projects
                <FolderOpen className="ml-2 text-orange-600" size={28} />
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-semibold">Manage all portfolio projects 🎨</p>
          </div>
        </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="pt-28 p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Projects List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-amber-200 relative overflow-hidden group sm:mt-28">
          <div className="absolute top-0 left-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Sparkles size={200} className="text-orange-600" />
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-black text-orange-900 flex items-center">
                <FolderOpen className="mr-2 text-orange-600" size={28} />
                Portfolio Projects
                <Sparkles className="ml-2 text-amber-500" size={22} />
              </h2>
              
              <div className="flex gap-3">
                <button
                  onClick={handleAddClick}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Add Project</span>
                </button>
                
                <button
                  onClick={fetchProjects}
                  className="bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <Zap size={18} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border-2 border-amber-200 rounded-lg font-bold text-gray-700 focus:outline-none focus:border-orange-600"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-bold">Loading projects...</p>
              </div>
            )}

            {!loading && filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  📁
                </div>
                <p className="text-xl font-black text-gray-900 mb-2">No Projects Found</p>
                <p className="text-gray-600 font-semibold">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Click "Add Project" to create your first project'}
                </p>
              </div>
            )}

            {!loading && filteredProjects.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map((project: Project, index: number) => {
                  const pid = project.id ?? project._id ?? `project-${index}`;
                  return (
                    <div
                      key={pid}
                      className="group/item bg-gradient-to-br from-amber-50 to-orange-50 hover:from-orange-100 hover:to-amber-100 rounded-xl overflow-hidden border-2 border-amber-200 hover:border-orange-600 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                    >
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          {project.featured && (
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                              <Star size={12} className="mr-1" />
                              Featured
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            project.status === 'completed' ? 'bg-green-500 text-white' :
                            project.status === 'in-progress' ? 'bg-blue-500 text-white' :
                            'bg-gray-500 text-white'
                          }`}>
                            {project.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-black text-xl text-gray-900 mb-1">{project.title}</h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                                {project.category}
                              </span>
                              {project.createdAt && (
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Calendar size={12} className="mr-1" />
                                  {new Date(project.createdAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="mb-4">
                          <p className="text-xs font-bold text-gray-600 mb-2 flex items-center">
                            <Code size={14} className="mr-1" />
                            Technologies:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies?.map((tech, i) => (
                              <span key={i} className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <p className="text-xs font-bold text-gray-600 mb-2 flex items-center">
                            <CheckCircle2 size={14} className="mr-1" />
                            Features:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.features?.slice(0, 3).map((feature, i) => (
                              <span key={i} className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded">
                                {feature}
                              </span>
                            ))}
                            {project.features && project.features.length > 3 && (
                              <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                +{project.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-4 border-t border-amber-200">
                          <button
                            onClick={() => handleEditClick(project)}
                            className="flex-1 flex items-center justify-center space-x-2 bg-orange-700 hover:bg-orange-800 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(pid)}
                            className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                          >
                            <Trash2 size={16} />
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

      {/* Add/Edit Project Dialog */}
      <AlertDialog open={addDialogOpen || editDialogOpen} onOpenChange={(open) => {
        setAddDialogOpen(open);
        setEditDialogOpen(open);
      }}>
        <AlertDialogContent className="bg-white border-2 border-orange-200 max-w-4xl max-h-[90vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-2xl font-black text-gray-900">
              {editDialogOpen ? <Edit className="mr-2 text-orange-600" size={24} /> : <Plus className="mr-2 text-green-600" size={24} />}
              {editDialogOpen ? 'Edit Project' : 'Add New Project'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              {editDialogOpen ? 'Update project details below' : 'Fill in the project information to add a new portfolio item'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={currentProject.title}
                onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                placeholder="Enter project title"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={currentProject.category}
                onChange={(e) => setCurrentProject({...currentProject, category: e.target.value})}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={currentProject.description}
                onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                placeholder="Enter project description"
              />
            </div>
            {/* Technologies */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Technologies * (Press Enter to add)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                  placeholder="e.g., React, Node.js"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies?.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2">
                    {tech}
                    <X size={14} className="cursor-pointer" onClick={() => removeTechnology(tech)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Features * (Press Enter to add)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                  placeholder="e.g., Responsive Design"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProject.features?.map((feature, i) => (
                  <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
                    {feature}
                    <X size={14} className="cursor-pointer" onClick={() => removeFeature(feature)} />
                  </span>
                ))}
              </div>
            </div>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Project Image *
              </label>
              <div className="flex flex-col gap-3">
                {currentProject.image && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-amber-200">
                    <img 
                      src={currentProject.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <label className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold">
                  <Upload size={18} className="mr-2" />
                  {imageFile ? imageFile.name : 'Choose Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500">Maximum file size: 5MB. Supported formats: JPG, PNG, WebP</p>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={currentProject.status}
                onChange={(e) => setCurrentProject({...currentProject, status: e.target.value as any})}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="planning">Planning</option>
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={currentProject.featured}
                onChange={(e) => setCurrentProject({...currentProject, featured: e.target.checked})}
                className="w-5 h-5"
              />
              <label className="text-sm font-bold text-gray-700">
                Mark as Featured Project
              </label>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                setAddDialogOpen(false);
                setEditDialogOpen(false);
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-2 rounded-lg"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSaveProject}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-2 rounded-lg"
            >
              <Save size={16} className="mr-2" />
              Save Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-orange-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-xl font-black text-gray-900">
              <AlertTriangle className="mr-2 text-red-600" size={24} />
              Delete Project?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-base">
              Are you sure you want to delete this project? This action cannot be undone.
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