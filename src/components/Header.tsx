import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
      navigate("/");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span 
            className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/')}
          >
            VibeNote
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => {
              const toolsSection = document.getElementById('tools-section');
              if (toolsSection) {
                toolsSection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
            className="text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            Explore Tools
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </button>
          <button 
            onClick={() => navigate('/voice-tools')}
            className="text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            Voice Training
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </button>
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors relative group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-2"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          {user ? (
            <>
              <span className="hidden sm:inline-flex text-sm text-muted-foreground">
                Welcome back!
              </span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSignOut}
                className="hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="hidden sm:inline-flex"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
              <Button 
                variant="default" 
                className="bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
                onClick={() => navigate("/auth")}
              >
                Get Started
              </Button>
            </>
          )}
          
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;