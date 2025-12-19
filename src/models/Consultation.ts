import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema(
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

    // Consultation Details
    preferredDate: {
      type: Date,
      required: [true, 'Preferred consultation date is required']
    },
    preferredTime: {
      type: String,
      required: [true, 'Preferred time is required'],
      enum: [
        'Morning (9:00 AM - 12:00 PM)',
        'Afternoon (12:00 PM - 3:00 PM)',
        'Evening (3:00 PM - 6:00 PM)',
        'Late Evening (6:00 PM - 9:00 PM)'
      ]
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required'],
      enum: [
        'Web Development',
        'Mobile App',
        'E-commerce',
        'Software Development',
        'Digital Marketing',
        'UI/UX Design',
        'Other'
      ]
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [20, 'Message must be at least 20 characters'],
      maxlength: [500, 'Message cannot be more than 500 characters']
    },

    // Status Management
    status: {
      type: String,
      enum: ['pending', 'scheduled', 'completed', 'cancelled'],
      default: 'pending'
    },
    
    // Admin fields
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [500, 'Admin notes cannot be more than 500 characters']
    },
    scheduledDate: {
      type: Date
    },
    meetingLink: {
      type: String,
      trim: true
    },
    
    // Priority
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },

    // Tracking
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
    timestamps: true
  }
);

// Indexes
consultationSchema.index({ email: 1 });
consultationSchema.index({ status: 1 });
consultationSchema.index({ preferredDate: 1 });
consultationSchema.index({ createdAt: -1 });

// Method to check if consultation request is urgent (within 24 hours)
consultationSchema.methods.isUrgent = function() {
  if (!this.preferredDate) return false;
  const hoursDiff = (this.preferredDate.getTime() - Date.now()) / (1000 * 60 * 60);
  return hoursDiff <= 24 && hoursDiff > 0;
};

export default mongoose.models.Consultation || mongoose.model('Consultation', consultationSchema);