import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ToolAnalysisResult {
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

interface ToolState {
  // Current tool state
  currentTool: string | null;
  isToolLoading: boolean;
  
  // Audio state
  audioData: Blob | File | null;
  micPermissionGranted: boolean;
  
  // Analysis results
  analysisResult: ToolAnalysisResult | null;
  showResult: boolean;
  
  // Voice modulation
  modulationMode: 'original' | 'higher' | 'deeper';
  
  // Actions
  setCurrentTool: (tool: string | null) => void;
  setIsToolLoading: (loading: boolean) => void;
  setAudioData: (data: Blob | File | null) => void;
  setMicPermission: (granted: boolean) => void;
  setAnalysisResult: (result: ToolAnalysisResult | null) => void;
  setShowResult: (show: boolean) => void;
  setModulationMode: (mode: 'original' | 'higher' | 'deeper') => void;
  
  // Request microphone permission
  requestMicPermission: () => Promise<boolean>;
  
  // Reset state
  resetTool: () => void;
}

export const useToolStore = create<ToolState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentTool: null,
      isToolLoading: false,
      audioData: null,
      micPermissionGranted: false,
      analysisResult: null,
      showResult: false,
      modulationMode: 'original',
      
      // Actions
      setCurrentTool: (tool) => set({ currentTool: tool }),
      setIsToolLoading: (loading) => set({ isToolLoading: loading }),
      setAudioData: (data) => set({ audioData: data }),
      setMicPermission: (granted) => set({ micPermissionGranted: granted }),
      setAnalysisResult: (result) => set({ analysisResult: result }),
      setShowResult: (show) => set({ showResult: show }),
      setModulationMode: (mode) => set({ modulationMode: mode }),
      
      requestMicPermission: async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach(track => track.stop()); // Clean up
          set({ micPermissionGranted: true });
          return true;
        } catch (error) {
          console.error('Microphone permission denied:', error);
          set({ micPermissionGranted: false });
          return false;
        }
      },
      
      resetTool: () => set({
        currentTool: null,
        isToolLoading: false,
        analysisResult: null,
        showResult: false,
      }),
    }),
    {
      name: 'tool-store'
    }
  )
);