import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Back to Top Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="icon"
              className="glass border-primary/30 hover:bg-primary/10"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">Alex Chen</h3>
            <p className="text-muted-foreground">Creative Designer & Developer</p>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center text-sm text-muted-foreground"
          >
            <p className="flex items-center justify-center gap-1">
              © 2024 Alex Chen. Made with
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
              and lots of coffee.
            </p>
            <p className="mt-1">All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;