import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { VoiceToolButton } from '@/components/voice/VoiceToolButton';
import { ResultCard } from '@/components/voice/ResultCard';
import { AudioUploader } from '@/components/voice/AudioUploader';
import { ModulationToggle } from '@/components/voice/ModulationToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Target, 
  Mic, 
  Sliders, 
  Zap, 
  Play,
  User,
  LogOut,
  Sparkles,
  TrendingUp,
  Clock
} from 'lucide-react';
import { tooltipData, feedbackMessages } from '@/data/tooltips';

interface AnalysisResult {
  tool: string;
  score: number;
  pitch?: string;
  feedback: string;
  suggestions?: string[];
  accuracy?: number;
  timing?: number;
  emotion?: string;
  confidence?: number;
}

interface VoiceToolsPageProps {
  className?: string;
}

export const VoiceToolsPage: React.FC<VoiceToolsPageProps> = ({ className }) => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const [currentTool, setCurrentTool] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [audioData, setAudioData] = useState<Blob | File | null>(null);
  const [modulationMode, setModulationMode] = useState<'original' | 'higher' | 'deeper'>('original');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock API simulation
  const simulateAnalysis = async (toolName: string): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    const mockResults = {
      'Pitch Matcher': {
        tool: 'Pitch Matcher',
        score: Math.floor(Math.random() * 30) + 70,
        pitch: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'][Math.floor(Math.random() * 7)],
        feedback: "Your pitch accuracy is improving! Focus on sustaining notes longer for better stability.",
        suggestions: [
          "Practice long tones to improve pitch stability",
          "Use a piano reference for pitch matching exercises",
          "Work on breath support for consistent tone"
        ],
        accuracy: Math.floor(Math.random() * 20) + 80,
        confidence: Math.floor(Math.random() * 10) + 90
      },
      'Karaoke Feedback': {
        tool: 'Karaoke Feedback',
        score: Math.floor(Math.random() * 25) + 75,
        feedback: "Great rhythm and timing! Your emotional expression is developing well.",
        suggestions: [
          "Focus on clear consonant pronunciation",
          "Practice transitioning between chest and head voice",
          "Work on dynamic expression in quieter passages"
        ],
        accuracy: Math.floor(Math.random() * 15) + 85,
        timing: Math.floor(Math.random() * 10) + 90,
        emotion: ['confident', 'passionate', 'gentle', 'powerful'][Math.floor(Math.random() * 4)],
        confidence: Math.floor(Math.random() * 8) + 92
      },
      'Voice Modulator': {
        tool: 'Voice Modulator',
        score: Math.floor(Math.random() * 20) + 80,
        feedback: `${modulationMode.charAt(0).toUpperCase() + modulationMode.slice(1)} modulation applied successfully! The tonal quality is well-preserved.`,
        suggestions: [
          "Experiment with different modulation levels",
          "Practice maintaining vocal technique with pitch changes",
          "Consider how modulation affects your vocal style"
        ],
        confidence: Math.floor(Math.random() * 5) + 95
      },
      'Live Feedback': {
        tool: 'Live Feedback',
        score: Math.floor(Math.random() * 35) + 65,
        feedback: "Real-time analysis shows good vocal control with some areas for improvement in breath management.",
        suggestions: [
          "Focus on consistent airflow throughout phrases",
          "Practice scales to improve pitch accuracy",
          "Work on posture for better vocal support"
        ],
        accuracy: Math.floor(Math.random() * 25) + 75,
        timing: Math.floor(Math.random() * 20) + 80,
        confidence: Math.floor(Math.random() * 15) + 85
      },
      'Try Demo Voice': {
        tool: 'Demo Voice Analysis',
        score: Math.floor(Math.random() * 10) + 90,
        pitch: 'F#4',
        feedback: "Demo analysis complete! This professional recording shows excellent technique and control.",
        suggestions: [
          "Notice the smooth vibrato technique",
          "Observe the breath control in long phrases",
          "Study the emotional expression patterns"
        ],
        accuracy: 95,
        timing: 98,
        emotion: 'professional',
        confidence: 99
      }
    };

    return mockResults[toolName as keyof typeof mockResults] || mockResults['Pitch Matcher'];
  };

  const handleToolClick = async (toolName: string) => {
    if (!audioData) {
      toast({
        title: "No audio detected",
        description: "Please record or upload audio first.",
        variant: "destructive"
      });
      return;
    }

    setCurrentTool(toolName);
    setIsAnalyzing(true);
    setShowResult(false);

    try {
      const result = await simulateAnalysis(toolName);
      setAnalysisResult(result);
      setShowResult(true);
      
      toast({
        title: "Analysis complete!",
        description: `${toolName} analysis finished with ${result.score}% score.`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again or check your audio input.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      setCurrentTool(null);
    }
  };

  const handleModulation = async () => {
    if (!audioData) {
      toast({
        title: "No audio detected",
        description: "Please record or upload audio first.",
        variant: "destructive"
      });
      return;
    }

    await handleToolClick('Voice Modulator');
  };

  const handleDemoVoice = async () => {
    // Simulate demo voice selection
    setAudioData(new Blob(['demo'], { type: 'audio/mp3' }));
    toast({
      title: "Demo voice loaded",
      description: "Professional demo recording ready for analysis.",
    });
    
    // Auto-analyze demo
    setTimeout(() => {
      handleToolClick('Try Demo Voice');
    }, 500);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "Come back soon to continue improving your voice!",
    });
  };

  const voiceTools = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Pitch Matcher",
      description: "Align your voice with reference tones",
      onClick: () => handleToolClick('Pitch Matcher'),
      tooltip: tooltipData.pitchMatcher.description
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Karaoke Feedback",
      description: "AI analysis of timing and tone",
      onClick: () => handleToolClick('Karaoke Feedback'),
      tooltip: tooltipData.karaokeFeedback.description
    },
    {
      icon: <Sliders className="w-6 h-6" />,
      title: "Voice Modulator",
      description: "Transform your vocal pitch",
      onClick: () => handleToolClick('Voice Modulator'),
      tooltip: tooltipData.voiceModulator.description
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Live Feedback",
      description: "Real-time vocal analysis",
      onClick: () => handleToolClick('Live Feedback'),
      tooltip: tooltipData.liveFeedback.description
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "Try Demo Voice",
      description: "Test with professional samples",
      onClick: handleDemoVoice,
      tooltip: tooltipData.demoVoice.description
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Vibernote
                </h1>
                <p className="text-sm text-muted-foreground">AI-Powered Vocal Training</p>
              </div>
            </div>

            {user && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">Welcome back, {user.email?.split('@')[0]}!</p>
                  <p className="text-xs text-muted-foreground">Keep practicing to improve</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl font-bold text-foreground">
            Master Your Voice with AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant feedback, improve your pitch, and unlock your vocal potential with our advanced AI-powered tools.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3" />
              Real-time Analysis
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              Instant Feedback
            </Badge>
          </div>
        </motion.div>

        {/* Audio Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AudioUploader
            onAudioSelected={(audio) => setAudioData(audio)}
            className="max-w-2xl mx-auto"
          />
        </motion.div>

        {/* Voice Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Voice Analysis Tools</h3>
            <p className="text-muted-foreground">Choose a tool to analyze your vocal performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
            {voiceTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <VoiceToolButton
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  onClick={tool.onClick}
                  isLoading={isAnalyzing && currentTool === tool.title}
                  disabled={isAnalyzing}
                  tooltipContent={tool.tooltip}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Modulation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <ModulationToggle
            selectedMode={modulationMode}
            onModeChange={setModulationMode}
            onModulate={handleModulation}
            isLoading={isAnalyzing && currentTool === 'Voice Modulator'}
          />
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {showResult && analysisResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Analysis Results</h3>
                <p className="text-muted-foreground">Your AI-powered vocal feedback</p>
              </div>
              
              <ResultCard
                result={analysisResult}
                isVisible={showResult}
                onClose={() => setShowResult(false)}
                onRetry={() => currentTool && handleToolClick(currentTool)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats/Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">87%</div>
              <p className="text-sm text-muted-foreground">Average pitch accuracy</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">+12%</div>
              <p className="text-sm text-muted-foreground">Improvement this week</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-500">24</div>
              <p className="text-sm text-muted-foreground">Sessions this month</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceToolsPage;