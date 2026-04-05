import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechFlow Solutions",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    testimonial: "Alex transformed our entire design system and user experience. The attention to detail and innovative solutions exceeded our expectations. Our user engagement increased by 40% after implementing Alex's designs.",
    project: "SaaS Dashboard Redesign"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "StartupBoost",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    testimonial: "Working with Alex was a game-changer for our startup. The website design not only looks stunning but also converted 45% better than our previous site. Highly recommend for any serious project.",
    project: "E-commerce Platform"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "InnovateLab",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    testimonial: "Alex's UI/UX expertise is exceptional. The mobile app design received a 4.8-star rating on the App Store, and users consistently praise the intuitive interface. Professional and creative!",
    project: "Mobile Banking App"
  },
  {
    id: 4,
    name: "David Park",
    role: "CTO",
    company: "Creative Digital Agency",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    testimonial: "Alex brings both technical expertise and design vision to every project. The component library they developed reduced our development time by 30% while maintaining excellent design quality.",
    project: "Design System"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "UX Research Lead",
    company: "TechFlow Solutions",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    testimonial: "Alex's research-driven approach to design is impressive. They conducted over 500 user interviews and translated insights into actionable design improvements that significantly enhanced user satisfaction.",
    project: "User Research & Design"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
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
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear what clients say about working with me. These testimonials reflect 
            my commitment to delivering exceptional design solutions and outstanding results.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main Testimonial Card */}
          <div className="relative overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Card className="glass hover:shadow-card transition-all duration-500">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    {/* Avatar & Info */}
                    <div className="flex-shrink-0 text-center md:text-left">
                      <Avatar className="h-20 w-20 mx-auto md:mx-0 mb-4 border-2 border-primary/20">
                        <AvatarImage src={testimonialsData[currentIndex].avatar} alt={testimonialsData[currentIndex].name} />
                        <AvatarFallback>{testimonialsData[currentIndex].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold text-lg">{testimonialsData[currentIndex].name}</h4>
                      <p className="text-primary font-medium">{testimonialsData[currentIndex].role}</p>
                      <p className="text-muted-foreground text-sm">{testimonialsData[currentIndex].company}</p>
                      <div className="flex justify-center md:justify-start gap-1 mt-2">
                        {renderStars(testimonialsData[currentIndex].rating)}
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <div className="flex-1 space-y-4">
                      <Quote className="h-8 w-8 text-primary/50 mx-auto md:mx-0" />
                      <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
                        "{testimonialsData[currentIndex].testimonial}"
                      </blockquote>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-primary">Project:</span>
                        <span className="text-sm text-muted-foreground">{testimonialsData[currentIndex].project}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="glass border-primary/30 hover:bg-primary/10 pointer-events-auto"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="glass border-primary/30 hover:bg-primary/10 pointer-events-auto"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        {/* Dots Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center gap-3 mt-8"
        >
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary scale-125 shadow-glow'
                  : 'bg-muted hover:bg-primary/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {[
            { number: "50+", label: "Happy Clients", description: "Successful projects delivered" },
            { number: "4.9", label: "Average Rating", description: "Based on client feedback" },
            { number: "98%", label: "Success Rate", description: "Projects completed on time" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className="text-center glass p-6 rounded-2xl"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="font-semibold text-lg mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;