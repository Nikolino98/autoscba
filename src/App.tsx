
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VehicleProvider } from "./contexts/VehicleContext";
import { ScrollToTopOnNavigate } from "./components/ScrollToTop";
import Index from "./pages/Index";
import VehicleCatalog from "./pages/VehicleCatalog";
import VehicleDetail from "./pages/VehicleDetail";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <VehicleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTopOnNavigate />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vehiculos/:type" element={<VehicleCatalog />} />
            <Route path="/vehiculo/:id" element={<VehicleDetail />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </VehicleProvider>
  </QueryClientProvider>
);

export default App;
