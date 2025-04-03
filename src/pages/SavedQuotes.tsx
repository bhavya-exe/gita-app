
import React from "react";
import { useQuotes } from "@/hooks/use-quotes";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SavedQuotes() {
  const { savedQuotes, removeQuote } = useQuotes();
  const { toast } = useToast();

  const handleRemoveQuote = (quote: any) => {
    removeQuote(quote);
    toast({
      title: "Quote removed",
      description: "Quote has been removed from your saved quotes",
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-serif font-semibold mb-4 text-center">Saved Wisdom</h2>

      {savedQuotes.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">You haven't saved any quotes yet.</p>
          <p className="text-sm">
            When you find wisdom that resonates with you, save it to revisit later.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedQuotes.map((quote, index) => (
            <Card key={`${quote.chapter}-${quote.verse_number}-${index}`}>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  Chapter {quote.chapter}, Verse {quote.verse_number}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-serif mb-2 italic">{quote.verse}</p>
                <p>{quote.translation}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive"
                  onClick={() => handleRemoveQuote(quote)}
                >
                  <Trash2 size={16} className="mr-1" /> Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
