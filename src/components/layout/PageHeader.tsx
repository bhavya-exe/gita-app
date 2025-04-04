
import React from "react";
import { MoonStar, Sun, User } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function PageHeader() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Gita Wisdom" className="w-7 h-7" />
        <h1 className="text-lg font-bold">Gita Wisdom</h1>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <MoonStar size={18} />}
        </button>
        <button className="p-2 rounded-full hover:bg-muted transition-colors">
          <User size={18} />
        </button>
      </div>
    </div>
  );
}
