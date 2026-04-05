import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Award, BookOpen, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const education = [
    {
      degree: "Bachelor of Information Technology (Software Engineering)",
      institution: "SEGi Kota Damansara (UCLan, UK)",
      year: "July 2024",
      grade: "CGPA: 2.7/4",
      icon: GraduationCap
    },
    {
      degree: "Diploma in Information Technology",
      institution: "SEGi Subang Jaya",
      year: "August 2021",
      grade: "CGPA: 2.46/4.0",
      icon: BookOpen
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter uppercase">Professional Profile</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {/* Biography */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 space-y-6"
            >
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <User className="text-primary h-6 w-6" />
                </motion.div>
                Who I Am
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Software Engineering graduate with strong experience in <strong>MERN Stack development</strong>, <strong>SEO optimization</strong>, and <strong>eCommerce marketing</strong>. Skilled in building scalable web applications, REST APIs, authentication systems, and responsive user interfaces.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Passionate about modern web technologies and delivering high-quality digital solutions. My background combines technical engineering with data-driven marketing strategies, allowing me to build products that not only work perfectly but also rank and convert.
              </p>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                className="flex flex-wrap gap-3 pt-4"
              >
                {["MongoDB", "Express.js", "React.js", "Node.js", "SEO", "eCommerce", "TypeScript", "Tailwind"].map((skill) => (
                  <motion.span 
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.15)" }}
                    className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium cursor-default transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Education */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <GraduationCap className="text-primary h-6 w-6" /> Education
              </h3>
              <div className="space-y-4">
                {education.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <Card className="glass border-primary/20 hover:border-primary/40 transition-colors cursor-default group overflow-hidden">
                      <CardContent className="p-4 relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                        <h4 className="font-bold text-sm leading-tight text-white relative z-10">{item.degree}</h4>
                        <p className="text-xs text-primary mt-1 relative z-10">{item.institution}</p>
                        <div className="flex justify-between items-center mt-2 relative z-10">
                          <span className="text-[10px] text-muted-foreground">{item.year}</span>
                          <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">{item.grade}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
