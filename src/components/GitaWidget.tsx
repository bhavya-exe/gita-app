
import React, { useState, useEffect } from "react";
import { useQuotes } from "@/hooks/use-quotes";
import { format } from "date-fns";
import { Cloud, Clock } from "lucide-react";

export function GitaWidget() {
  const { getRandomQuote } = useQuotes();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [quote, setQuote] = useState<{
    verse: string;
    translation: string;
    chapter: number;
    verse_number: number;
  } | null>(null);

  // Update time every minute
  useEffect(() => {
    setQuote(getRandomQuote());
    
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Get current date, time and format them
  const dayName = format(currentDate, "EEEE");
  const day = format(currentDate, "d");
  const month = format(currentDate, "MMMM");
  const time = format(currentDate, "HH:mm");
  
  if (!quote) return null;

  return (
    <div className="rounded-xl overflow-hidden backdrop-blur-sm bg-white/20 border border-white/20 text-white shadow-lg w-full max-w-md mx-auto">
      {/* Date Header */}
      <div className="p-4 pb-2 text-center border-b border-white/20">
        <h2 className="text-2xl font-medium">
          {dayName} {day} {month}
        </h2>
      </div>
      
      {/* Time Display */}
      <div className="p-6 text-center">
        <h1 className="text-7xl font-light">{time}</h1>
      </div>
      
      {/* Weather & Quote */}
      <div className="grid grid-cols-2 p-4 pt-0 gap-4">
        {/* Weather Placeholder */}
        <div className="flex items-center gap-2">
          <Cloud className="h-8 w-8" />
          <div>
            <p className="text-xl">Clear Sky</p>
            <p className="text-sm">H:30° L:22°</p>
          </div>
        </div>
        
        {/* Quote */}
        <div className="text-right">
          <p className="font-semibold">
            Gita {quote.chapter}:{quote.verse_number}
          </p>
          <p className="text-sm line-clamp-2">
            {quote.translation}
          </p>
        </div>
      </div>
    </div>
  );
}
