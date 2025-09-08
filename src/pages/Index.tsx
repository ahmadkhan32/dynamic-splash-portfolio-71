import { SplashCursor } from "@/components/ui/splash-cursor";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Global Splash Cursor Effect */}
      <SplashCursor />
      
      {/* Main Content */}
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
