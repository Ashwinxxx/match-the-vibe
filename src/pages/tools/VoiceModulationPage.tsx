import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Volume2, ArrowLeft, Mic, Play, Square, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useToolStore } from '@/hooks/useToolStore';
import { useToast } from '@/hooks/use-toast';

const VoiceModulationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    audioData, 
    isToolLoading, 
    setCurrentTool, 
    setIsToolLoading,
    modulationMode,
    setModulationMode,
    micPermissionGranted,
    requestMicPermission 
  } = useToolStore();
  
  const [isRecording, setIsRecording] = useState(false);
  const [pitchShift, setPitchShift] = useState([0]);
  const [formant, setFormant] = useState([0]);
  const [resonance, setResonance] = useState([50]);

  useEffect(() => {
    setCurrentTool('Voice Modulation');
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
    
    // Simulate voice modulation processing
    setTimeout(() => {
      setIsRecording(false);
      setIsToolLoading(false);
      
      toast({
        title: "Modulation applied!",
        description: "Your voice has been processed with the selected effects",
      });
    }, 2000);
  };

  const presets = [
    { name: 'Original', pitch: 0, formant: 0, resonance: 50 },
    { name: 'Higher', pitch: 5, formant: 3, resonance: 60 },
    { name: 'Deeper', pitch: -5, formant: -3, resonance: 40 },
    { name: 'Robot', pitch: 0, formant: 0, resonance: 80 },
    { name: 'Whisper', pitch: -2, formant: 2, resonance: 30 },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setPitchShift([preset.pitch]);
    setFormant([preset.formant]);
    setResonance([preset.resonance]);
    
    toast({
      title: `${preset.name} preset applied`,
      description: "Voice modulation settings updated",
    });
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
              <Volume2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Voice Modulation</h1>
              <p className="text-muted-foreground">Transform your voice with professional effects</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Presets */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="h-5 w-5" />
                  Voice Presets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {presets.map((preset, index) => (
                    <motion.div
                      key={preset.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => applyPreset(preset)}
                        className="w-full h-16 flex-col gap-1 hover:bg-accent"
                      >
                        <span className="font-medium">{preset.name}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Manual Controls */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Manual Controls</CardTitle>
                <p className="text-sm text-muted-foreground">Fine-tune your voice modulation</p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Pitch Shift */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Pitch Shift</label>
                    <Badge variant="secondary">{pitchShift[0]} semitones</Badge>
                  </div>
                  <Slider
                    value={pitchShift}
                    onValueChange={setPitchShift}
                    min={-12}
                    max={12}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Formant */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Formant</label>
                    <Badge variant="secondary">{formant[0]}</Badge>
                  </div>
                  <Slider
                    value={formant}
                    onValueChange={setFormant}
                    min={-10}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Resonance */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Resonance</label>
                    <Badge variant="secondary">{resonance[0]}%</Badge>
                  </div>
                  <Slider
                    value={resonance}
                    onValueChange={setResonance}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recording Controls */}
            <Card className="p-6">
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Test Your Voice</h3>
                  <p className="text-muted-foreground">Record to hear the modulation effects</p>
                </div>

                <div className="flex justify-center">
                  {!isRecording ? (
                    <Button
                      onClick={handleStartRecording}
                      size="lg"
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-6"
                      disabled={isToolLoading}
                    >
                      <Mic className="mr-2 h-6 w-6" />
                      Start Recording
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsRecording(false)}
                      size="lg"
                      variant="destructive"
                      className="px-8 py-6"
                    >
                      <Square className="mr-2 h-6 w-6" />
                      Stop Recording
                    </Button>
                  )}
                </div>

                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-secondary/10 rounded-xl p-6"
                  >
                    <div className="animate-pulse">
                      <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <div className="w-6 h-6 bg-primary rounded-full animate-ping" />
                      </div>
                      <p className="font-medium">Processing Voice...</p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Real-time Preview */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Real-time Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Volume2 className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isRecording ? "Modulating..." : "Ready to process"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Modulation Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">Start with presets, then fine-tune manually</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">Small adjustments often sound more natural</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">Use formant changes for gender transformation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Export</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Play className="mr-2 h-4 w-4" />
                  Play Processed Audio
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VoiceModulationPage;