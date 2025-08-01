import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import VoiceToolsPage from "./pages/VoiceToolsPage";
import PitchMatchPage from "./pages/tools/PitchMatchPage";
import VoiceModulationPage from "./pages/tools/VoiceModulationPage";
import ComingSoon from "./components/coming_soon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/voice-tools" element={<VoiceToolsPage />} />
            <Route path="/tool/pitch-match" element={<PitchMatchPage />} />
            <Route path="/tool/voice-modulation" element={<VoiceModulationPage />} />
            {/* Unimplemented tools - route to coming soon */}
            <Route path="/tool/instrument-tuner" element={<ComingSoon />} />
            <Route path="/tool/ai-karaoke" element={<ComingSoon />} />
            <Route path="/tool/voice-analyzer" element={<ComingSoon />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
