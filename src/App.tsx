import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "./components/ui/sonner";

// Import our new pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Karma from "./pages/Karma";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 pb-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/karma" element={<Karma />} />
              </Routes>
            </main>
            <Navbar />
          </div>
          <Toaster />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
