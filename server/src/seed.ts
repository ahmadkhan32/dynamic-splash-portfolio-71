import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User';
import Project from './models/Project';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});

    // Create Admin User
    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = new User({
      username: 'admin',
      passwordHash: passwordHash
    });
    await admin.save();
    console.log('Admin user created: admin / admin123');

    // Create Sample Projects
    const projects = [
      {
        title: "The Glases eCommerce",
        description: "A premium eyewear store featuring a virtual try-on system and AI-powered frame recommendations.",
        techStack: ["React", "Node.js", "MongoDB", "Fabric.js"],
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop",
        githubUrl: "https://github.com/ahmadkhan32/the-glases",
        liveUrl: "https://the-glases.com",
        featured: true,
        category: "Full Stack"
      },
      {
        title: "AI Face Analytics",
        description: "Real-time face mesh tracking and facial attribute analysis using MediaPipe and TensorFlow.js.",
        techStack: ["TypeScript", "MediaPipe", "TensorFlow.js", "React"],
        image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&h=600&fit=crop",
        githubUrl: "https://github.com/ahmadkhan32/ai-face",
        liveUrl: "https://ai-face-demo.com",
        featured: true,
        category: "Web Development"
      },
      {
        title: "SEO Audit Pro",
        description: "A comprehensive tool for technical SEO audits, core web vitals tracking, and keyword ranking analysis.",
        techStack: ["Node.js", "Express", "Puppeteer", "Redis"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        githubUrl: "https://github.com/ahmadkhan32/seo-audit",
        liveUrl: "https://seo-audit-pro.com",
        featured: false,
        category: "Data Visualization"
      }
    ];

    await Project.insertMany(projects);
    console.log('Sample projects seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();
