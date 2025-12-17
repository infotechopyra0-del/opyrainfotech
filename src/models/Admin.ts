import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends mongoose.Document {
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'super-admin']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Password hash karne se pehle
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next;
  } catch (error: any) {
    return next;
  }
});

// Password compare method
adminSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;