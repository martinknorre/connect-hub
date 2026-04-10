import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import SimCards from "./pages/SimCards";
import ServiceProfiles from "./pages/ServiceProfiles";
import Operations from "./pages/Operations";
import Reports from "./pages/Reports";
import Configuration from "./pages/Configuration";
import UsersPage from "./pages/UsersPage";
import EventTriggers from "./pages/EventTriggers";
import EventTriggerDetail from "./pages/EventTriggerDetail";
import Organisations from "./pages/Organisations";
import SimDetail from "./pages/SimDetail";
import ServiceProfileDetail from "./pages/ServiceProfileDetail";
import ReportDetail from "./pages/ReportDetail";
import ConfigurationDetail from "./pages/ConfigurationDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sims" element={<SimCards />} />
            <Route path="/sims/:id" element={<SimDetail />} />
            <Route path="/profiles" element={<ServiceProfiles />} />
            <Route path="/profiles/:id" element={<ServiceProfileDetail />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:id" element={<ReportDetail />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/configuration/:section" element={<ConfigurationDetail />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/triggers" element={<EventTriggers />} />
            <Route path="/triggers/:id" element={<EventTriggerDetail />} />
            <Route path="/organisations" element={<Organisations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
