
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked, Share2, ArrowRight, BookOpen, PenTool, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuotes } from "@/hooks/use-quotes";
import { useDateTime } from "@/hooks/use-date-time";
import { format } from "date-fns";

export default function Home() {
  const { toast } = useToast();
  const { getRandomQuote, saveQuote } = useQuotes();
  const currentDate = useDateTime();
  const [quote, setQuote] = useState<{
    verse: string;
    translation: string;
    chapter: number;
    verse_number: number;
    explanation: string;
  } | null>(null);

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const handleSaveQuote = () => {
    if (quote) {
      saveQuote(quote);
      toast({
        title: "Quote saved",
        description: "This quote has been added to your saved quotes",
      });
    }
  };

  const handleShareQuote = () => {
    if (!quote) return;
    
    if (navigator.share) {
      navigator.share({
        title: `Bhagavad Gita Chapter ${quote.chapter}, Verse ${quote.verse_number}`,
        text: `${quote.verse}\n\n${quote.translation}\n\n~ Bhagavad Gita Ch.${quote.chapter}, Verse ${quote.verse_number}`,
        url: window.location.href,
      }).catch(() => {
        toast({
          title: "Share failed",
          description: "Could not share this quote",
        });
      });
    } else {
      navigator.clipboard.writeText(
        `${quote.verse}\n\n${quote.translation}\n\n~ Bhagavad Gita Ch.${quote.chapter}, Verse ${quote.verse_number}`
      );
      toast({
        title: "Copied to clipboard",
        description: "Quote has been copied to clipboard",
      });
    }
  };

  if (!quote) {
    return <div className="flex justify-center items-center h-[70vh]">Loading...</div>;
  }

  // Format the date for display
  const formattedDate = format(currentDate, "EEEE, MMMM d");

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Greeting Section */}
      <div className="mb-6 pt-2">
        <h1 className="text-3xl font-bold">Namaste.</h1>
        <p className="text-muted-foreground">{formattedDate}</p>
      </div>

      {/* Today's Wisdom Section */}
      <div className="relative mb-6 overflow-hidden rounded-xl">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-500/90 to-indigo-800/90"
          style={{
            backgroundImage: `url("/lovable-uploads/74aa5e8e-11f9-42b8-9989-e940fcfaa3ba.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
          }}
        ></div>
        <div className="relative p-6 text-white">
          <h2 className="text-xl font-medium mb-1">Today's Wisdom</h2>
          <p className="font-serif italic text-white/80 mb-2">"{quote.verse.substring(0, 80)}..."</p>
          <p className="text-sm font-medium">
            Bhagavad Gita {quote.chapter}:{quote.verse_number}
          </p>
          <div className="mt-4 flex gap-3">
            <Button 
              size="sm" 
              className="bg-amber-500 hover:bg-amber-600 text-black font-medium"
              onClick={() => window.location.href = "#full-quote"}
            >
              Read
            </Button>
            <Button 
              size="sm"
              variant="outline" 
              className="border-white/30 bg-white/10 hover:bg-white/20 text-white"
              onClick={handleShareQuote}
            >
              Listen
            </Button>
          </div>
        </div>
      </div>

      {/* Daily Activities */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Daily Practice</h2>
        
        <Card className="overflow-hidden bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-950/40 dark:to-blue-950/40">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <PenTool size={20} className="text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-medium">Spiritual Journal</h3>
                  <p className="text-xs text-muted-foreground">1 min • Reflect on your journey</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="rounded-full">
                <ArrowUpRight size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/40">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <BookOpen size={20} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-medium">Your Verse</h3>
                  <p className="text-xs text-muted-foreground">2 min • Daily verse study</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="rounded-full">
                <ArrowUpRight size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ask About Topics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ask About...</h2>
        <div className="grid grid-cols-2 gap-3">
          <div 
            className="relative overflow-hidden rounded-xl aspect-[4/3] flex items-end"
            style={{
              backgroundImage: `url("/lovable-uploads/72e06918-b3f2-491b-a544-dda7717241fa.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="relative p-3 text-white">
              <p className="font-medium">Karma</p>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <span>47,652</span>
              </p>
            </div>
          </div>
          
          <div 
            className="relative overflow-hidden rounded-xl aspect-[4/3] flex items-end"
            style={{
              backgroundImage: `url("/lovable-uploads/d43f65bd-52e2-4b2b-bbb7-a50e0d50147e.png")`,
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="relative p-3 text-white">
              <p className="font-medium">Dharma</p>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <span>130,289</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Quote Section */}
      <div id="full-quote" className="mt-8 pt-4">
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-serif font-semibold mb-4">
              Chapter {quote.chapter}, Verse {quote.verse_number}
            </h2>
            <p className="mb-4 font-serif italic">{quote.verse}</p>
            <p className="mb-6 font-medium">{quote.translation}</p>
            <h3 className="text-lg font-semibold mb-2">Explanation</h3>
            <p className="text-muted-foreground">{quote.explanation}</p>
            
            <div className="flex gap-4 justify-start mt-6">
              <Button variant="outline" onClick={handleSaveQuote}>
                <BookMarked className="mr-2" size={18} />
                Save
              </Button>
              <Button variant="outline" onClick={handleShareQuote}>
                <Share2 className="mr-2" size={18} />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
