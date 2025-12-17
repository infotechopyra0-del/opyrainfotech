import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: [
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
      ]
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    image: {
      type: String,
      required: [true, 'Project image is required'],
      trim: true
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one technology must be specified'
      }
    },
    features: {
      type: [String],
      required: [true, 'At least one feature is required'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one feature must be specified'
      }
    },
    clientName: {
      type: String,
      trim: true,
      maxlength: [100, 'Client name cannot be more than 100 characters']
    },
    projectUrl: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'planning'],
      default: 'completed'
    },
    featured: {
      type: Boolean,
      default: false
    },
    completionDate: {
      type: Date
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Add indexes for better query performance
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ order: 1 });
projectSchema.index({ createdAt: -1 });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);