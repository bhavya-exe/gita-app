
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Import our new pages
import Home from "./pages/Home";
import SavedQuotes from "./pages/SavedQuotes";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import KarmaStreak from "./pages/KarmaStreak";

// Import our new layout
import { AppLayout } from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Home /></AppLayout>} />
          <Route path="/saved" element={<AppLayout><SavedQuotes /></AppLayout>} />
          <Route path="/karma" element={<AppLayout><KarmaStreak /></AppLayout>} />
          <Route path="/chat" element={<AppLayout><Chat /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
