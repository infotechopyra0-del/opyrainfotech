import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema(
  {
    // Personal Information
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
        'Please enter a valid phone number'
      ]
    },
    company: {
      type: String,
      trim: true,
      maxlength: [150, 'Company name cannot be more than 150 characters']
    },

    // Project Details
    services: {
      type: [String],
      required: [true, 'At least one service must be selected'],
      enum: [
        'Web Design & Development',
        'E-commerce Solutions',
        'Mobile App Development',
        'Custom Software Development',
        'ERP Systems',
        'CRM Solutions',
        'Digital Marketing',
        'SEO Services',
        'Brand Identity & Design',
        'Other'
      ],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'Please select at least one service'
      }
    },
    budget: {
      type: String,
      required: [true, 'Budget range is required'],
      trim: true,
      enum: [
        'Under ₹50,000',
        '₹50,000 - ₹1,00,000',
        '₹1,00,000 - ₹2,50,000',
        '₹2,50,000 - ₹5,00,000',
        '₹5,00,000 - ₹10,00,000',
        'Above ₹10,00,000'
      ]
    },
    timeline: {
      type: String,
      required: [true, 'Project timeline is required'],
      trim: true,
      enum: [
        'ASAP (Rush job)',
        'Within 2 weeks',
        'Within 1 month',
        'Within 2-3 months',
        '3-6 months',
        'No specific deadline'
      ]
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      minlength: [50, 'Description must be at least 50 characters'],
      maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    additional_info: {
      type: String,
      trim: true,
      maxlength: [1000, 'Additional information cannot be more than 1000 characters']
    },

    // Status Management
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'quoted', 'accepted', 'rejected', 'completed'],
      default: 'pending'
    },
    
    // Admin Notes
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Admin notes cannot be more than 1000 characters']
    },
    
    // Quote Details (filled by admin)
    quotedAmount: {
      type: Number,
      min: [0, 'Quoted amount cannot be negative']
    },
    quotedTimeline: {
      type: String,
      trim: true
    },
    quoteDetails: {
      type: String,
      trim: true
    },
    quoteSentDate: {
      type: Date
    },

    // Priority
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },

    // Source tracking
    source: {
      type: String,
      enum: ['website', 'referral', 'social-media', 'direct', 'other'],
      default: 'website'
    },

    // Follow-up tracking
    followUpDate: {
      type: Date
    },
    lastContactedDate: {
      type: Date
    },
    
    // IP and tracking for security
    ipAddress: {
      type: String,
      trim: true
    },
    userAgent: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// Indexes for better query performance
quoteSchema.index({ email: 1 });
quoteSchema.index({ status: 1 });
quoteSchema.index({ priority: 1 });
quoteSchema.index({ createdAt: -1 });
quoteSchema.index({ budget: 1 });
quoteSchema.index({ timeline: 1 });

// Virtual for full name with company
quoteSchema.virtual('displayName').get(function() {
  return this.company ? `${this.name} (${this.company})` : this.name;
});

// Method to check if quote is overdue (more than 48 hours without response)
quoteSchema.methods.isOverdue = function() {
  if (this.status !== 'pending') return false;
  const hoursSinceCreation = (Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60);
  return hoursSinceCreation > 48;
};

// Static method to get statistics
quoteSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  return stats;
};

export default mongoose.models.Quote || mongoose.model('Quote', quoteSchema);