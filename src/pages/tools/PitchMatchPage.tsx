import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target, ArrowLeft, Mic, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToolStore } from '@/hooks/useToolStore';
import { useToast } from '@/hooks/use-toast';

const PitchMatchPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    audioData, 
    isToolLoading, 
    setCurrentTool, 
    setIsToolLoading,
    micPermissionGranted,
    requestMicPermission 
  } = useToolStore();
  
  const [isRecording, setIsRecording] = useState(false);
  const [pitchScore, setPitchScore] = useState(0);
  const [targetPitch, setTargetPitch] = useState('C4');

  useEffect(() => {
    setCurrentTool('Pitch Match');
    return () => setCurrentTool(null);
  }, [setCurrentTool]);

  const handleStartRecording = async () => {
    if (!micPermissionGranted) {
      const granted = await requestMicPermission();
      if (!granted) {
        toast({
          title: "Microphone access required",
          description: "Please enable microphone access to use this tool",
          variant: "destructive"
        });
        return;
      }
    }

    setIsRecording(true);
    setIsToolLoading(true);
    
    // Simulate pitch matching analysis
    setTimeout(() => {
      const score = Math.floor(Math.random() * 30) + 70;
      setPitchScore(score);
      setIsRecording(false);
      setIsToolLoading(false);
      
      toast({
        title: "Analysis complete!",
        description: `Pitch accuracy: ${score}%`,
      });
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsToolLoading(false);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Pitch Match</h1>
              <p className="text-muted-foreground">Perfect your vocal pitch with AI analysis</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Main Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Voice Analysis</CardTitle>
                <p className="text-muted-foreground">
                  Sing along to match the target pitch
                </p>
              </CardHeader>
              
              <CardContent className="space-y-8">
                {/* Target Pitch Display */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">{targetPitch}</div>
                  <p className="text-muted-foreground">Target Pitch</p>
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center">
                  {!isRecording ? (
                    <Button
                      onClick={handleStartRecording}
                      size="lg"
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-6"
                      disabled={isToolLoading}
                    >
                      <Mic className="mr-2 h-6 w-6" />
                      Start Analysis
                    </Button>
                  ) : (
                    <Button
                      onClick={handleStopRecording}
                      size="lg"
                      variant="destructive"
                      className="px-8 py-6"
                    >
                      <Square className="mr-2 h-6 w-6" />
                      Stop Recording
                    </Button>
                  )}
                </div>

                {/* Live Feedback */}
                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-secondary/10 rounded-xl p-6 text-center"
                  >
                    <div className="animate-pulse">
                      <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary rounded-full animate-ping" />
                      </div>
                      <p className="text-lg font-medium">Listening...</p>
                      <p className="text-sm text-muted-foreground">Keep singing to match the pitch</p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Pitch Accuracy */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Pitch Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-green-500">{pitchScore}%</div>
                <Progress value={pitchScore} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {pitchScore >= 90 ? "Excellent pitch control!" : 
                   pitchScore >= 75 ? "Good accuracy, keep practicing!" :
                   "Room for improvement - focus on breath support"}
                </p>
              </CardContent>
            </Card>

            {/* Practice Tips */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Practice Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">Use proper breathing technique for stable pitch</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">Practice scales to improve pitch accuracy</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">Listen carefully to the target pitch before singing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setTargetPitch('A4')}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Play Reference Tone
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/voice-tools')}
                >
                  Try Other Tools
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PitchMatchPage;