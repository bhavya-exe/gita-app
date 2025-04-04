
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuotes } from "@/hooks/use-quotes";
import { GitaWidget } from "@/components/GitaWidget";

export default function Home() {
  const { toast } = useToast();
  const { getRandomQuote, saveQuote } = useQuotes();
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

  return (
    <div className="p-4 space-y-6">
      {/* Widget Display */}
      <div className="relative mb-8">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-orange-500/70 to-purple-500/70 rounded-xl -z-10"
          style={{
            backgroundImage: `url("/lovable-uploads/614a6b77-73e5-49de-9065-efb45a0bbcde.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8
          }}
        ></div>
        <GitaWidget />
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-serif font-semibold text-center">Today's Wisdom</h2>
        <p className="text-muted-foreground text-center">
          Chapter {quote.chapter}, Verse {quote.verse_number}
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center font-serif italic">
            "{quote.verse}"
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 font-medium">{quote.translation}</p>
          <h3 className="text-lg font-semibold mb-2">Explanation</h3>
          <p className="text-muted-foreground">{quote.explanation}</p>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={handleSaveQuote}>
          <BookMarked className="mr-2" size={20} />
          Save
        </Button>
        <Button variant="outline" onClick={handleShareQuote}>
          <Share2 className="mr-2" size={20} />
          Share
        </Button>
      </div>
    </div>
  );
}
