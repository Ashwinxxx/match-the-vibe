import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Music, Waves, Mic } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Unlock Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-glow">
              Perfect Voice
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            AI-Powered Music Platform for Artists,{" "}
            <br className="hidden md:block" />
            Trained with Professional Audio Data
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Creating Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const toolsSection = document.getElementById('tools-section');
                if (toolsSection) {
                  toolsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              Explore Our Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Features preview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16">
            {[
              "Pitch Match",
              "Voice Modulation", 
              "Instrument Tuner",
              "AI Karaoke",
              "Voice Analyzer"
            ].map((feature, index) => (
              <div 
                key={feature}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-sm font-medium">{feature}</div>
              </div>
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