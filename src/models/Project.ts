import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  technologies: [{ type: String, required: true }],
  features: [{ type: String, required: true }],
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planning'],
    default: 'completed'
  },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  completionDate: Date
}, {
  timestamps: true
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);