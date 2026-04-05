import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const experienceData = [
  {
    id: 1,
    title: "MERN Stack Developer & SEO Specialist",
    company: "Freelance / Projects",
    location: "Global",
    period: "2023 - Present",
    type: "Freelance",
    description: "Developing scalable web applications and providing SEO optimization for diverse clients. Specialized in building high-quality REST APIs, secure authentication systems, and optimized eCommerce platforms.",
    achievements: [
      "Built a full-stack MERN Blog platform with secure JWT authentication and admin dashboard",
      "Developed an eCommerce Product Research system for automated SEO & Keyword-based listing optimization",
      "Created a robust Authentication System with protected routes and persistent user sessions",
      "Delivered high-performance React-based portfolio solutions for professional clients"
    ],
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "JWT"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Keyword Research & eCommerce Specialist",
    company: "Latitude Marketing Company",
    location: "Remote",
    period: "June 2023 - August 2023",
    type: "Full-time",
    description: "Successfully handled high-volume keyword research and eCommerce platform optimization for global marketplaces.",
    achievements: [
      "Provided profitable keyword research with low competition and high search volume",
      "Optimized product listings for Amazon, eBay, Shopee, and Lazada using Helium 10 & Jungle Scout",
      "Delivered comprehensive client reports on time with data-driven marketing insights",
      "Improved search rankings for client stores through strategic On-page and Off-page SEO"
    ],
    technologies: ["Helium 10", "Jungle Scout", "On-page SEO", "Marketplace Optimization", "Ahrefs"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Software Engineering Intern",
    company: "Education Projects",
    location: "SEGi Kota Damansara",
    period: "2021 - 2024",
    type: "Internship / Academic",
    description: "Applied software engineering principles to build technical solutions during Bachelor's and Diploma programs.",
    achievements: [
      "Developed .NET and C# applications for desktop management systems",
      "Experimented with Flutter and Dart for cross-platform mobile development",
      "Built full-stack web solutions using MySQL and Node.js for academic assessments",
      "Graduated with honors from SEGi and UCLan (UK) partnership program"
    ],
    technologies: ["C#", ".NET", "MySQL", "Flutter", "Dart", "Software Architecture"],
    color: "from-green-500 to-emerald-500"
  }
];



const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="experience" className="py-20 relative">
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
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey through innovative companies where I've crafted digital experiences, 
            led design teams, and contributed to products used by millions of users worldwide.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experienceData.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${experience.color} shadow-glow animate-pulse-glow`} />
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} md:w-5/12`}>
                  <Card className="glass hover:shadow-card transition-all duration-500 group hover:scale-[1.02]">
                    <CardContent className="p-6 space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                            {experience.title}
                          </h3>
                          <span className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${experience.color} text-white`}>
                            {experience.type}
                          </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            <span className="font-semibold text-foreground">{experience.company}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {experience.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {experience.period}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Key Achievements */}
                      <div>
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {experience.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">
                          Technologies & Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">
              Core <span className="gradient-text">Competencies</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "UI/UX Design", value: "95%" },
                { label: "Frontend Dev", value: "88%" },
                { label: "User Research", value: "92%" },
                { label: "Team Leadership", value: "85%" }
              ].map((skill) => (
                <div key={skill.label} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{skill.value}</div>
                  <div className="text-sm text-muted-foreground">{skill.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;