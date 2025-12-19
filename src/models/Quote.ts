import mongoose from 'mongoose';

export interface IQuote extends mongoose.Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const quoteSchema = new mongoose.Schema<IQuote>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  services: {
    type: [String],
    required: [true, 'At least one service is required'],
    validate: {
      validator: function(v: string[]) {
        return v && v.length > 0;
      },
      message: 'At least one service must be selected'
    }
  },
  budget: {
    type: String,
    required: [true, 'Budget is required'],
    trim: true
  },
  timeline: {
    type: String,
    required: [true, 'Timeline is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  additional_info: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'quoted', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  adminNotes: {
    type: String,
    trim: true,
    default: ''
  },
  quotedAmount: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
quoteSchema.index({ status: 1, createdAt: -1 });
quoteSchema.index({ priority: 1, createdAt: -1 });
quoteSchema.index({ email: 1 });

const Quote = mongoose.models.Quote || mongoose.model<IQuote>('Quote', quoteSchema);

export default Quote;