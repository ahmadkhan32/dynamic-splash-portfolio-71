import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import { getProjects } from "@/services/projectService";
import { Project } from "@/types";
import { toast } from "sonner";

const categories = ["All", "Web Development", "UI/UX Design", "Data Visualization", "Branding", "Full Stack"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([
    {
      _id: "1",
      title: "Evinn Electric Bikes",
      description: "A cutting-edge platform for smart electric bikes, showcasing high-performance EV models with integrated GPS tracking and battery analytics.",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1611243533855-f285ed3472d9?q=80&w=2070&auto=format&fit=crop",
      techStack: ["React", "Tailwind", "Node.js", "Three.js"],
      liveUrl: "https://evinn.pk/",
      githubUrl: "#",
      featured: true
    },
    {
      _id: "2",
      title: "Consultancy Pro",
      description: "Modern business consultancy landing page designed for professional services, client management, and lead generation.",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      techStack: ["Next.js", "Framer Motion", "TypeScript"],
      liveUrl: "https://counsultancy1.vercel.app/",
      githubUrl: "#",
      featured: false
    },

    {
      _id: "3",
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
      _id: "4",
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
      _id: "5",
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
      _id: "6",
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
      _id: "7",
      title: "Medicare Portal",
      description: "Comprehensive healthcare management system for hospital appointments, patient records, and medical consultations.",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop",
      techStack: ["MERN Stack", "Socket.io", "React Query"],
      liveUrl: "https://medicare-cyan-eta.vercel.app/#home",
      githubUrl: "#",
      featured: true
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data: Project[] = await getProjects();
        if (data && data.length > 0) {
          setProjectsData(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback is already set in the initial state
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onHoverStart={() => project._id && setHoveredProject(project._id)}
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
                        <Button size="sm" className="glass border-primary/30" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" className="glass border-primary/30" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
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
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
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
        )}

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