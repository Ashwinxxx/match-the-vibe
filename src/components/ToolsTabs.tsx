import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Volume2, Wrench, Mic2, BarChart3, Play, Zap } from "lucide-react";

const tools = [
  {
    id: "pitch-match",
    name: "Pitch Match",
    icon: Target,
    description: "Perfect your vocal pitch with AI-powered analysis",
    features: ["Real-time pitch correction", "Vocal range analysis", "Harmony suggestions"],
    demo: "Match your voice to any song instantly"
  },
  {
    id: "voice-modulation",
    name: "Voice Modulation", 
    icon: Volume2,
    description: "Transform your voice with professional effects",
    features: ["Voice character presets", "Custom modulation", "Real-time processing"],
    demo: "Transform your voice into different styles"
  },
  {
    id: "instrument-tuner",
    name: "Instrument Tuner",
    icon: Wrench,
    description: "Precision tuning for all instruments", 
    features: ["Auto-detection", "Custom temperaments", "Visual feedback"],
    demo: "Tune any instrument with precision"
  },
  {
    id: "ai-karaoke",
    name: "AI Karaoke",
    icon: Mic2,
    description: "Sing along with AI-generated backing tracks",
    features: ["Vocal isolation", "Key adjustment", "Lyric timing"],
    demo: "Create karaoke from any song"
  },
  {
    id: "voice-analyzer",
    name: "Voice Analyzer",
    icon: BarChart3,
    description: "Deep analysis of vocal performance",
    features: ["Vocal health insights", "Performance metrics", "Improvement tips"],
    demo: "Analyze and improve your voice"
  }
];

const ToolsTabs = () => {
  const [activeTab, setActiveTab] = useState("pitch-match");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
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
    <section id="tools-section" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            Professional Music{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI Tools
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Everything you need to perfect your music, powered by advanced AI technology
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <motion.div variants={itemVariants}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto p-1 bg-card border">
                {tools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={tool.id}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TabsTrigger 
                        value={tool.id}
                        className="flex flex-col p-4 space-y-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-sm font-medium hidden sm:inline">
                          {tool.name}
                        </span>
                      </TabsTrigger>
                    </motion.div>
                  );
                })}
              </TabsList>
            </motion.div>

            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <TabsContent key={tool.id} value={tool.id} className="mt-8">
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300">
                      <CardHeader className="text-center pb-8">
                        <motion.div 
                          className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-glow"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <CardTitle className="text-3xl font-bold">{tool.name}</CardTitle>
                        <CardDescription className="text-lg text-muted-foreground">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-8">
                        {/* Demo section */}
                        <motion.div 
                          className="bg-gradient-secondary/10 rounded-xl p-8 text-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-12 mb-6">
                            <Play className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse-slow" />
                            <p className="text-lg font-medium">{tool.demo}</p>
                          </div>
                          <Button 
                            size="lg" 
                            className="bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                          >
                            <Zap className="mr-2 h-5 w-5" />
                            Try It Now
                          </Button>
                        </motion.div>

                        {/* Features */}
                        <div className="grid md:grid-cols-3 gap-4">
                          {tool.features.map((feature, index) => (
                            <motion.div 
                              key={index}
                              className="bg-background/50 rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-colors"
                              whileHover={{ y: -2, scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                              style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                              <div className="text-sm font-medium text-center">{feature}</div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsTabs;