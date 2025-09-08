import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A modern, responsive e-commerce platform built with React and Node.js, featuring real-time inventory management and seamless payment integration.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Mobile Banking App",
    category: "UI/UX Design",
    description: "Intuitive mobile banking interface design focusing on security, accessibility, and user experience optimization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["Figma", "Principle", "After Effects"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "AI Dashboard",
    category: "Data Visualization",
    description: "Interactive dashboard for AI model performance monitoring with real-time analytics and customizable widgets.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 4,
    title: "Brand Identity System",
    category: "Branding",
    description: "Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
    technologies: ["Adobe Creative Suite", "Figma", "Sketch"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 5,
    title: "Social Media Platform",
    category: "Full Stack",
    description: "A feature-rich social media platform with real-time messaging, content sharing, and advanced privacy controls.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    technologies: ["Next.js", "GraphQL", "PostgreSQL", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 6,
    title: "Portfolio Website",
    category: "Web Development",
    description: "Responsive portfolio website with advanced animations and optimized performance for creative professionals.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  }
];

const categories = ["All", "Web Development", "UI/UX Design", "Data Visualization", "Branding", "Full Stack"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as any
      }
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my latest work spanning web development, UI/UX design, 
            and creative digital solutions that push the boundaries of user experience.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`
                px-6 py-2 rounded-full transition-all duration-300
                ${activeCategory === category 
                  ? "bg-gradient-primary text-primary-foreground shadow-glow" 
                  : "glass border-primary/30 hover:bg-primary/10"
                }
              `}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group"
            >
              <Card className="project-card h-full overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button size="sm" className="glass border-primary/30">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="glass border-primary/30">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="glass border-primary/30">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-primary px-3 py-1 text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="glass border-primary/30 hover:bg-primary/10"
          >
            View All Projects
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;