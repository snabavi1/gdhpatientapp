
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PhysicianDashboard from "./pages/PhysicianDashboard";
import PhysicianProfile from "./pages/PhysicianProfile";
import PhysicianAuth from "./components/PhysicianAuth";
import EnhancedSignup from "./components/enhanced-signup/EnhancedSignup";
import TrackingBoard from "./components/physician/TrackingBoard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Patient-facing routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/signup" element={<EnhancedSignup />} />
            
            {/* Physician-facing routes */}
            <Route path="/physician/auth" element={<PhysicianAuth />} />
            <Route path="/physician" element={<PhysicianDashboard />} />
            <Route path="/physician/profile" element={<PhysicianProfile />} />
            <Route path="/physician/trackingboard" element={<RealDataTrackingBoard darkMode={false} />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
