import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mic, Target, Zap } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ToolsTabs from "@/components/ToolsTabs";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Voice Tools CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Train Your Voice?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Use our AI-powered vocal analysis tools to improve your pitch, timing, and overall performance.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4 text-primary" />
              <span>Pitch Matching</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mic className="w-4 h-4 text-primary" />
              <span>Real-time Feedback</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span>Voice Modulation</span>
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate('/voice-tools')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Voice Training
            </Button>
          </motion.div>
        </div>
      </motion.section>
      
      <ToolsTabs />
    </div>
  );
};

export default Index;
