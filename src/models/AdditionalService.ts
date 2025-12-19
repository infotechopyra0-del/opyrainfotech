import mongoose from 'mongoose';

const AdditionalServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    image: {
      type: String,
      required: [true, 'Image is required']
    },
    category: {
      type: String,
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
      ],
      default: 'Other'
    },
    isActive: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.models.AdditionalService || mongoose.model('AdditionalService', AdditionalServiceSchema);