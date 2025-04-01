
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import Subscription from "./pages/Subscription";
import CodeEditor from "./pages/CodeEditor";
import ProblemVisualization from "./pages/ProblemVisualization";
import NotFound from "./pages/NotFound";
import SubmissionHistory from "./pages/SubmissionHistory";
import Certifications from "./pages/Certifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/editor/:problemId" element={<CodeEditor />} />
          <Route path="/problem/:problemId" element={<ProblemVisualization />} />
          <Route path="/submissions" element={<SubmissionHistory />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
