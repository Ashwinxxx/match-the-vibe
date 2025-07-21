import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, TrendingUp, Volume2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface ResultCardProps {
  result: AnalysisResult | null;
  isVisible: boolean;
  onClose: () => void;
  onRetry?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  isVisible,
  onClose,
  onRetry
}) => {
  if (!result) return null;

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-orange-500";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 70) return <TrendingUp className="w-5 h-5 text-yellow-500" />;
    return <AlertCircle className="w-5 h-5 text-orange-500" />;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-2xl mx-auto"
        >
          <Card className="bg-card/95 backdrop-blur-sm border-border/50 shadow-lg relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    {getScoreIcon(result.score)}
                  </motion.div>
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {result.tool} Analysis
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Analysis completed
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="relative space-y-6">
              {/* Score Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">Overall Score</span>
                </div>
                <div className="text-right">
                  <div className={cn("text-2xl font-bold", getScoreColor(result.score))}>
                    {result.score}%
                  </div>
                  {result.confidence && (
                    <div className="text-xs text-muted-foreground">
                      {result.confidence}% confidence
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Metrics Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
              >
                {result.pitch && (
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Pitch</div>
                    <div className="font-semibold text-primary">{result.pitch}</div>
                  </div>
                )}
                {result.accuracy && (
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                    <div className="font-semibold">{result.accuracy}%</div>
                  </div>
                )}
                {result.timing && (
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Timing</div>
                    <div className="font-semibold">{result.timing}%</div>
                  </div>
                )}
                {result.emotion && (
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Emotion</div>
                    <div className="font-semibold capitalize">{result.emotion}</div>
                  </div>
                )}
              </motion.div>

              {/* Feedback Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span>AI Feedback</span>
                  <Badge variant="secondary" className="text-xs">
                    Powered by Vibernote AI
                  </Badge>
                </h4>
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                  <p className="text-foreground leading-relaxed">{result.feedback}</p>
                </div>
              </motion.div>

              {/* Suggestions */}
              {result.suggestions && result.suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <h4 className="font-semibold text-foreground">Improvement Suggestions</h4>
                  <div className="space-y-2">
                    {result.suggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-foreground">{suggestion}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-3 pt-4"
              >
                {onRetry && (
                  <Button
                    variant="outline"
                    onClick={onRetry}
                    className="flex-1"
                  >
                    Try Again
                  </Button>
                )}
                <Button
                  onClick={onClose}
                  className="flex-1"
                >
                  Continue
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};