import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Brain, Database, Palette, Users, Zap, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const About = () => {
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

  const techStack = [
    {
      icon: Brain,
      name: "AI Audio Intelligence",
      description: "Advanced machine learning for vocal analysis and real-time feedback"
    },
    {
      icon: Database,
      name: "Supabase Backend",
      description: "Secure, scalable database with real-time capabilities"
    },
    {
      icon: Palette,
      name: "Modern UI/UX",
      description: "Beautiful, responsive design with Tailwind CSS and Framer Motion"
    }
  ];

  const testimonials = [
    {
      quote: "VibeNote has completely transformed how I practice vocals. The real-time feedback is incredible!",
      author: "Sarah Chen",
      role: "Vocal Coach"
    },
    {
      quote: "As a music producer, the AI-powered tools have streamlined my workflow significantly.",
      author: "Marcus Rodriguez",
      role: "Music Producer"
    },
    {
      quote: "The pitch matching feature helped me improve my singing accuracy by 40% in just two weeks.",
      author: "Emma Thompson",
      role: "Singer-Songwriter"
    }
  ];

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

        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              VibeNote
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empowering musicians and creators with AI-powered vocal and music intelligence tools 
            that make professional-grade audio analysis accessible to everyone.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-border/50">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold mb-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                At VibeNote, we believe that everyone deserves access to professional-grade music tools. 
                Our AI-powered platform democratizes vocal training and music production, providing instant 
                feedback, personalized guidance, and cutting-edge analysis tools that were once only 
                available in expensive studios.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tech Stack */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powered by Advanced Technology
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-glow transition-all duration-300 hover:scale-105">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{tech.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center">{tech.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  Real-time AI feedback that adapts to your unique voice and style
                </p>
                <p className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  Building a community of creators who learn and grow together
                </p>
                <p className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  Making professional music production accessible to everyone
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4">Why VibeNote?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Instant, accurate vocal analysis using cutting-edge AI</li>
                <li>• Personalized training programs that adapt to your progress</li>
                <li>• Professional-grade tools without the professional price tag</li>
                <li>• Community-driven platform with shared learning experiences</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center">
          <Card className="bg-gradient-primary/10 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Music?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of musicians who are already using VibeNote to improve their craft.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/voice-tools')}
                className="bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;