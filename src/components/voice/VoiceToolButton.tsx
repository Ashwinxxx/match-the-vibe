import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface VoiceToolButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
  tooltipContent?: string;
}

export const VoiceToolButton: React.FC<VoiceToolButtonProps> = ({
  icon,
  title,
  description,
  onClick,
  isLoading = false,
  disabled = false,
  variant = 'outline',
  className,
  tooltipContent
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={cn("w-full", className)}
          >
            <Button
              onClick={onClick}
              disabled={disabled || isLoading}
              variant={variant}
              className={cn(
                "w-full h-auto p-6 flex flex-col items-center gap-4 text-left relative overflow-hidden",
                "bg-card hover:bg-card/80 border-border/50 hover:border-primary/30",
                "transition-all duration-300 group",
                isLoading && "cursor-not-allowed opacity-70"
              )}
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Loading overlay */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                    />
                    <span className="text-sm font-medium">Analyzing...</span>
                  </div>
                </motion.div>
              )}
              
              {/* Icon */}
              <motion.div
                className="text-3xl text-primary group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>
              
              {/* Content */}
              <div className="space-y-2 text-center relative z-10">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                  {description}
                </p>
              </div>
              
              {/* Hover indicator */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </TooltipTrigger>
        {tooltipContent && (
          <TooltipContent side="top" className="max-w-xs">
            <p>{tooltipContent}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};