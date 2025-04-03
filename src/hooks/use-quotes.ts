
import { useState, useEffect } from 'react';
import { sampleQuotes } from '@/data/sampleQuotes';

interface Quote {
  verse: string;
  translation: string;
  chapter: number;
  verse_number: number;
  explanation: string;
}

export function useQuotes() {
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>(() => {
    const saved = localStorage.getItem('savedQuotes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
  }, [savedQuotes]);

  const getRandomQuote = (): Quote => {
    const randomIndex = Math.floor(Math.random() * sampleQuotes.length);
    return sampleQuotes[randomIndex];
  };

  const saveQuote = (quote: Quote) => {
    // Check if quote already exists
    const exists = savedQuotes.some(
      (q) => q.chapter === quote.chapter && q.verse_number === quote.verse_number
    );
    
    if (!exists) {
      setSavedQuotes((prev) => [...prev, quote]);
    }
  };

  const removeQuote = (quote: Quote) => {
    setSavedQuotes((prev) =>
      prev.filter(
        (q) => !(q.chapter === quote.chapter && q.verse_number === quote.verse_number)
      )
    );
  };

  return {
    savedQuotes,
    getRandomQuote,
    saveQuote,
    removeQuote,
  };
}
