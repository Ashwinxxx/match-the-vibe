import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { 
  Mic, 
  MicOff, 
  Upload, 
  FileAudio, 
  Play, 
  Pause, 
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AudioUploaderProps {
  onAudioSelected: (audio: Blob | File, type: 'recorded' | 'uploaded') => void;
  className?: string;
}

export const AudioUploader: React.FC<AudioUploaderProps> = ({
  onAudioSelected,
  className
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [uploadMode, setUploadMode] = useState<'upload' | 'record'>('record');
  
  const { toast } = useToast();
  const {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    clearRecording,
    audioUrl
  } = useAudioRecorder();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        onAudioSelected(file, 'uploaded');
        toast({
          title: "Audio uploaded successfully!",
          description: `${file.name} is ready for analysis.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file (MP3, WAV, etc.)",
          variant: "destructive"
        });
      }
    }
  }, [onAudioSelected, toast]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg', '.webm']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const handleRecordingStart = async () => {
    try {
      await startRecording();
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });
    } catch (error) {
      toast({
        title: "Recording failed",
        description: "Please check your microphone permissions.",
        variant: "destructive"
      });
    }
  };

  const handleRecordingStop = () => {
    stopRecording();
    toast({
      title: "Recording completed",
      description: "Your audio is ready for analysis.",
    });
  };

  const handleRecordingComplete = () => {
    if (audioBlob) {
      onAudioSelected(audioBlob, 'recorded');
    }
  };

  const togglePlayback = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    } else if (selectedFile) {
      const audio = new Audio(URL.createObjectURL(selectedFile));
      audio.onended = () => setIsPlaying(false);
      audio.onpause = () => setIsPlaying(false);
      audio.play();
      setAudioElement(audio);
      setIsPlaying(true);
    } else if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onended = () => setIsPlaying(false);
      audio.onpause = () => setIsPlaying(false);
      audio.play();
      setAudioElement(audio);
      setIsPlaying(true);
    }
  };

  const clearAll = () => {
    setSelectedFile(null);
    clearRecording();
    setIsPlaying(false);
    if (audioElement) {
      audioElement.pause();
      setAudioElement(null);
    }
  };

  const hasAudio = selectedFile || audioBlob;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Mode Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-muted rounded-lg p-1 flex">
          <Button
            variant={uploadMode === 'record' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setUploadMode('record')}
            className="rounded-md"
          >
            <Mic className="w-4 h-4 mr-2" />
            Record
          </Button>
          <Button
            variant={uploadMode === 'upload' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setUploadMode('upload')}
            className="rounded-md"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {uploadMode === 'record' ? (
          <motion.div
            key="record"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 text-center space-y-4">
                <motion.div
                  animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: isRecording ? Infinity : 0, duration: 1 }}
                  className="flex justify-center"
                >
                  {isRecording ? (
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 bg-red-500/20 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                      <Button
                        size="lg"
                        onClick={handleRecordingStop}
                        className="rounded-full w-16 h-16 bg-red-500 hover:bg-red-600 text-white relative z-10"
                      >
                        <MicOff className="w-6 h-6" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="lg"
                      onClick={handleRecordingStart}
                      className="rounded-full w-16 h-16"
                      disabled={!!audioBlob}
                    >
                      <Mic className="w-6 h-6" />
                    </Button>
                  )}
                </motion.div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">
                    {isRecording ? "Recording..." : "Record Your Voice"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRecording 
                      ? "Speak clearly into your microphone. Click stop when done."
                      : "Click the microphone to start recording your vocal performance."
                    }
                  </p>
                </div>

                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2 text-red-500"
                  >
                    <motion.div
                      className="w-2 h-2 bg-red-500 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                    <span className="text-sm font-medium">REC</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              {...getRootProps()} 
              className={cn(
                "bg-card/50 backdrop-blur-sm border-border/50 cursor-pointer transition-all duration-300",
                isDragActive && "border-primary bg-primary/5 scale-105",
                isDragReject && "border-destructive bg-destructive/5"
              )}
            >
              <input {...getInputProps()} />
              <CardContent className="p-8 text-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center"
                >
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center",
                    isDragActive ? "bg-primary/20" : "bg-muted"
                  )}>
                    <Upload className={cn(
                      "w-8 h-8",
                      isDragActive ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">
                    {isDragActive ? "Drop your audio here" : "Upload Audio File"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Drag & drop an audio file or click to browse
                  </p>
                  <div className="flex justify-center gap-2">
                    {['MP3', 'WAV', 'M4A'].map((format) => (
                      <Badge key={format} variant="secondary" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Preview */}
      <AnimatePresence>
        {hasAudio && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-muted/30 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <FileAudio className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {selectedFile?.name || "Recorded Audio"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB` : "Ready for analysis"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlayback}
                      className="w-8 h-8 p-0"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAll}
                      className="w-8 h-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="text-green-500">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {audioBlob && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <Button
                      onClick={handleRecordingComplete}
                      className="w-full"
                      size="sm"
                    >
                      Use This Recording
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};