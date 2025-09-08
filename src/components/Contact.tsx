import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-spam field
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { toast } = useToast();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic spam protection - if honeypot field is filled, ignore the submission
    if (formData.honeypot) {
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
        variant: "default",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: ''
      });
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: "Something went wrong. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "alex.chen@email.com",
      link: "mailto:alex.chen@email.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      link: "https://maps.google.com"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com",
      username: "@alexchen"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://linkedin.com",
      username: "Alex Chen"
    },
    {
      icon: Twitter,
      name: "Twitter",
      href: "https://twitter.com",
      username: "@alexdesigns"
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your next project to life? I'd love to hear about your ideas 
            and discuss how we can create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Start a Conversation</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you need a complete design overhaul, a new website, or just want to 
                discuss your project ideas, I'm here to help. I typically respond within 24 hours.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 glass p-4 rounded-xl hover:bg-primary/10 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <info.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">{info.title}</h4>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="pt-8 border-t border-border"
            >
              <h4 className="font-semibold mb-4">Follow My Work</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass p-3 rounded-xl hover:bg-primary/20 transition-all duration-300 group"
                    title={`${social.name} - ${social.username}`}
                  >
                    <social.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Card className="glass">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field for spam protection */}
                  <input
                    type="text"
                    name="website"
                    style={{ display: 'none' }}
                    value={formData.honeypot}
                    onChange={(e) => handleInputChange('honeypot', e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="John Doe"
                        className={`glass ${errors.name ? 'border-destructive' : 'border-primary/30'}`}
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        className={`glass ${errors.email ? 'border-destructive' : 'border-primary/30'}`}
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Project Discussion"
                      className={`glass ${errors.subject ? 'border-destructive' : 'border-primary/30'}`}
                    />
                    {errors.subject && (
                      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell me about your project..."
                      rows={6}
                      className={`glass resize-none ${errors.message ? 'border-destructive' : 'border-primary/30'}`}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-hero"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Required fields. Your information is kept private and secure.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;