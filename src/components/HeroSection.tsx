import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Music, Waves, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 50%, rgba(51, 65, 85, 0.7) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-primary/20 animate-float">
          <Music size={60} />
        </div>
        <div className="absolute top-40 right-20 text-primary/20 animate-float" style={{ animationDelay: '2s' }}>
          <Waves size={80} />
        </div>
        <div className="absolute bottom-32 left-20 text-primary/20 animate-float" style={{ animationDelay: '4s' }}>
          <Mic size={50} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
          >
            Unlock Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-glow">
              Perfect Voice
            </span>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed px-4 sm:px-0"
          >
            AI-Powered Music Platform for Artists,{" "}
            <br className="hidden md:block" />
            Trained with Professional Audio Data
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4 sm:px-0"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto"
                onClick={() => navigate('/voice-tools')}
              >
                <Play className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                Start Training Now
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg transition-all duration-300 w-full sm:w-auto"
                onClick={() => {
                  const toolsSection = document.getElementById('tools-section');
                  if (toolsSection) {
                    const headerOffset = 80;
                    const elementPosition = toolsSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Explore Our Tools
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Features preview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mt-12 md:mt-16">
            {[
              "Pitch Match",
              "Voice Modulation", 
              "Instrument Tuner",
              "AI Karaoke",
              "Voice Analyzer"
            ].map((feature, index) => (
              <motion.div 
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 md:p-4 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-xs md:text-sm font-medium">{feature}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;