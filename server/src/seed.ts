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
        title: "Evinn.pk",
        description: "A premium e-commerce platform for high-end fashion and lifestyle products, featuring seamless checkout and product filtering.",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
        techStack: ["React", "Tailwind", "Node.js", "MongoDB"],
        liveUrl: "https://evinn.pk/",
        githubUrl: "#",
        featured: true
      },
      {
        title: "Consultancy Pro",
        description: "Modern business consultancy landing page designed for professional services, client management, and lead generation.",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1454165833762-010200e7a461?q=80&w=2070&auto=format&fit=crop",
        techStack: ["Next.js", "Framer Motion", "TypeScript"],
        liveUrl: "https://counsultancy1.vercel.app/",
        githubUrl: "#",
        featured: false
      },
      {
        title: "Agri-Tech Solutions",
        description: "Advanced agriculture project focusing on smart farming solutions, crop monitoring, and sustainable resource management.",
        category: "Data Visualization",
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop",
        techStack: ["React", "Chart.js", "Node.js"],
        liveUrl: "https://agriculture-project200.vercel.app/",
        githubUrl: "#",
        featured: true
      },
      {
        title: "Zroxz Official",
        description: "A high-performance digital agency portfolio showcasing creative solutions, branding, and premium web design.",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2010&auto=format&fit=crop",
        techStack: ["React", "Three.js", "Tailwind"],
        liveUrl: "https://zroxz.com/",
        githubUrl: "#",
        featured: false
      },
      {
        title: "Zivo Creative",
        description: "Creative design studio platform focusing on innovative visual identities, digital marketing, and user-centric designs.",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
        techStack: ["Next.js", "Tailwind", "GSAP"],
        liveUrl: "https://zivocreative.vercel.app/",
        githubUrl: "#",
        featured: true
      },
      {
        title: "ETC Webs",
        description: "Enterprise-grade web solutions and IT services portal, delivering scalable architecture and custom development.",
        category: "Full Stack",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
        techStack: ["React", "Express", "PostgreSQL"],
        liveUrl: "https://etcwebs20.vercel.app/",
        githubUrl: "#",
        featured: false
      },
      {
        title: "Medicare Portal",
        description: "Comprehensive healthcare management system for hospital appointments, patient records, and medical consultations.",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop",
        techStack: ["MERN Stack", "Socket.io", "React Query"],
        liveUrl: "https://medicare-cyan-eta.vercel.app/#home",
        githubUrl: "#",
        featured: true
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
