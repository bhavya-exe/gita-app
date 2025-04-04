
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Loader } from "lucide-react";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Simulate loading progress
        if (prevProgress >= 100) {
          clearInterval(interval);
          // Slight delay before calling onLoadComplete to show 100%
          setTimeout(() => {
            onLoadComplete();
          }, 500);
          return 100;
        }
        // Speed up progress near the end
        const increment = prevProgress > 80 ? 3 : prevProgress > 50 ? 2 : 1;
        return prevProgress + increment;
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-10">
          <img src="/logo.svg" alt="Gita Wisdom" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">Gita Wisdom</h1>
        </div>
        
        <Progress value={progress} className="w-full h-2 mb-4" />
        
        <div className="flex items-center">
          <Loader className="animate-spin mr-2" size={16} />
          <p className="text-sm text-muted-foreground">
            Loading wisdom...{progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
