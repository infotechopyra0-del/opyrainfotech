#!/usr/bin/env node
/**
 * scripts/seed-projects.js
 * Seed the `projects` collection using the Project model structure.
 * Usage: node ./scripts/seed-projects.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const projects = [
  {
    id: 1,
    title: 'TechCorp Solutions',
    category: 'Web Development',
    description: 'Complete digital transformation with modern web application and CRM system integration.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
    features: ['Responsive Design', 'API Integration', 'Dashboard Analytics', 'User Management']
  },
  {
    id: 2,
    title: 'Fashion Empire E-commerce',
    category: 'E-commerce',
    description: 'Modern e-commerce platform with advanced product management and payment gateway integration.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    features: ['Shopping Cart', 'Payment Gateway', 'Inventory Management', 'Order Tracking']
  },
  {
    id: 3,
    title: 'Hospitality Group Website',
    category: 'Business Website',
    description: 'Elegant website for restaurant chain with online reservation system and menu management.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['WordPress', 'PHP', 'MySQL', 'JavaScript'],
    features: ['Online Reservations', 'Menu Display', 'Location Finder', 'Customer Reviews']
  },
  {
    id: 4,
    title: 'Kumar Tech Ventures',
    category: 'Corporate Website',
    description: 'Professional corporate website with portfolio showcase and client management system.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Bootstrap'],
    features: ['Portfolio Gallery', 'Contact Forms', 'Team Profiles', 'News & Updates']
  },
  {
    id: 5,
    title: 'Sharma Innovations App',
    category: 'Mobile Application',
    description: 'Cross-platform mobile application for business process management and team collaboration.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    features: ['Real-time Chat', 'Task Management', 'File Sharing', 'Push Notifications']
  },
  {
    id: 6,
    title: 'Digital Marketing Dashboard',
    category: 'Web Application',
    description: 'Analytics dashboard for digital marketing campaigns with real-time reporting and insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Angular', 'Python', 'Django', 'Chart.js'],
    features: ['Analytics Reports', 'Campaign Tracking', 'Data Visualization', 'Export Tools']
  }
];

async function main() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  // Define schema matching src/models/Project.ts (subset)
  const projectSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    image: String,
    technologies: [String],
    features: [String],
    clientName: String,
    projectUrl: String,
    status: { type: String, default: 'completed' },
    featured: { type: Boolean, default: false },
    completionDate: Date,
    order: { type: Number, default: 0 }
  }, { timestamps: true });

  const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

  try {
    for (const p of projects) {
      const filter = { title: p.title };
      const update = {
        $set: {
          title: p.title,
          category: p.category,
          description: p.description,
          image: p.image,
          technologies: p.technologies,
          features: p.features,
          order: p.id || 0,
          status: 'completed'
        }
      };

      const res = await Project.findOneAndUpdate(filter, update, { upsert: true, new: true, setDefaultsOnInsert: true });
      console.log(`Upserted project: ${res.title}`);
    }

    console.log('Seeding completed');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
