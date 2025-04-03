
import React from "react";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function PageHeader() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Gita Wisdom" className="w-8 h-8" />
        <h1 className="text-lg font-semibold">Gita Wisdom</h1>
      </div>
      <button 
        onClick={toggleTheme} 
        className="p-2 rounded-full hover:bg-muted transition-colors"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun size={20} /> : <MoonStar size={20} />}
      </button>
    </div>
  );
}
