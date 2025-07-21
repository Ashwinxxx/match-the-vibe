import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModulationMode {
  id: 'original' | 'higher' | 'deeper';
  label: string;
  description: string;
  icon: React.ReactNode;
  pitch: string;
  disabled?: boolean;
}

interface ModulationToggleProps {
  selectedMode: 'original' | 'higher' | 'deeper';
  onModeChange: (mode: 'original' | 'higher' | 'deeper') => void;
  onModulate: () => void;
  isLoading?: boolean;
  className?: string;
}

export const ModulationToggle: React.FC<ModulationToggleProps> = ({
  selectedMode,
  onModeChange,
  onModulate,
  isLoading = false,
  className
}) => {
  const modes: ModulationMode[] = [
    {
      id: 'original',
      label: 'Original',
      description: 'Natural voice',
      icon: <Volume2 className="w-4 h-4" />,
      pitch: '0 ST'
    },
    {
      id: 'higher',
      label: 'Higher',
      description: 'Brighter tone',
      icon: <TrendingUp className="w-4 h-4" />,
      pitch: '+2 ST'
    },
    {
      id: 'deeper',
      label: 'Deeper',
      description: 'Richer tone',
      icon: <TrendingDown className="w-4 h-4" />,
      pitch: '-2 ST'
    }
  ];

  return (
    <Card className={cn("bg-card/50 backdrop-blur-sm border-border/50", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-primary" />
          Voice Modulation
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Adjust your vocal pitch and tone in real-time
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Mode Selection */}
        <div className="grid grid-cols-3 gap-2">
          {modes.map((mode) => (
            <motion.div
              key={mode.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={selectedMode === mode.id ? 'default' : 'outline'}
                onClick={() => onModeChange(mode.id)}
                disabled={mode.disabled || isLoading}
                className={cn(
                  "w-full h-auto p-3 flex flex-col items-center gap-2 relative overflow-hidden",
                  selectedMode === mode.id && "bg-primary text-primary-foreground"
                )}
              >
                {/* Selection indicator */}
                {selectedMode === mode.id && (
                  <motion.div
                    layoutId="modulation-indicator"
                    className="absolute inset-0 bg-primary/20 rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className={cn(
                    "p-1.5 rounded-md",
                    selectedMode === mode.id ? "bg-primary-foreground/20" : "bg-muted"
                  )}>
                    {mode.icon}
                  </div>
                  
                  <div className="text-center">
                    <div className="font-medium text-xs">{mode.label}</div>
                    <div className={cn(
                      "text-xs",
                      selectedMode === mode.id ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {mode.pitch}
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Selected Mode Info */}
        <motion.div
          key={selectedMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-muted/30 rounded-lg p-3 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            {modes.find(m => m.id === selectedMode)?.icon}
            <span className="font-medium text-sm">
              {modes.find(m => m.id === selectedMode)?.label} Mode
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {modes.find(m => m.id === selectedMode)?.description}
          </p>
          <Badge variant="secondary" className="mt-2 text-xs">
            {modes.find(m => m.id === selectedMode)?.pitch} semitones
          </Badge>
        </motion.div>

        {/* Modulate Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onModulate}
            disabled={isLoading}
            className="w-full relative overflow-hidden"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <span>Apply Modulation</span>
              </div>
            )}
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
                repeatDelay: 1
              }}
            />
          </Button>
        </motion.div>

        {/* Tips */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>💡 <strong>Tip:</strong> Use higher pitch for pop songs, deeper for blues</p>
          <p>🎵 Modulation preserves timing and emotion</p>
        </div>
      </CardContent>
    </Card>
  );
};