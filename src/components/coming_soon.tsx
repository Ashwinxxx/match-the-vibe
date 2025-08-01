import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

export default function ComingSoon() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <motion.div
        className="container mx-auto px-4 pt-24 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 border-border/50">
            <CardContent className="p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Clock className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Coming{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Soon
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
                We're working hard to bring you something amazing. Stay tuned for updates!
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate('/')}
                  size="lg"
                  className="bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore What's Available
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}