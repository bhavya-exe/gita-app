import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked, Share2, LogIn, MessageCircle, RefreshCw, ArrowUpRight, MoonStar, Sun, Settings } from "lucide-react";
import { toast } from 'sonner';
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '@/contexts/LanguageContext';
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import KarmaPreview from "@/components/KarmaPreview";
import { useTheme } from "@/hooks/use-theme";
import { SettingsMenu } from "@/components/SettingsMenu";

interface DailyQuote {
  text: string;
  author: string;
  date: string;
}

interface GitaQuote {
  verse: string;
  translation: string;
  chapter: number;
  verse_number: number;
  explanation: string;
}

export default function Home() {
  const currentDate = new Date();
  const [quote, setQuote] = useState<GitaQuote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [dailyQuote, setDailyQuote] = useState<DailyQuote | null>(null);
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setQuote({
        verse: "The mind is everything. What you think you become.",
        translation: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः",
        chapter: 6,
        verse_number: 5,
        explanation: "The mind is the cause of both bondage and liberation."
      });
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    loadDailyQuote();
  }, []);

  const loadDailyQuote = () => {
    setIsLoading(true);
    const quotes = [
      {
        text: "The mind is everything. What you think you become.",
        author: "Buddha",
        date: new Date().toISOString()
      },
      {
        text: "Peace comes from within. Do not seek it without.",
        author: "Buddha",
        date: new Date().toISOString()
      },
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        date: new Date().toISOString()
      }
    ];
    
    const savedQuote = localStorage.getItem('dailyQuote');
    const today = new Date().toDateString();
    
    if (savedQuote) {
      const parsedQuote = JSON.parse(savedQuote);
      if (new Date(parsedQuote.date).toDateString() === today) {
        setDailyQuote(parsedQuote);
        setIsLoading(false);
        return;
      }
    }
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDailyQuote(randomQuote);
    localStorage.setItem('dailyQuote', JSON.stringify(randomQuote));
    setIsLoading(false);
  };

  const handleSaveQuote = () => {
    if (quote) {
      const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]');
      savedQuotes.push({
        id: Date.now().toString(),
        text: `${quote.verse}\n\n${quote.translation}`,
        source: `Bhagavad Gita Ch.${quote.chapter}, Verse ${quote.verse_number}`,
        date: new Date().toISOString()
      });
      localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
      toast.success(t('quoteSaved'));
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
        toast.error(t('shareFailed'));
      });
    } else {
      navigator.clipboard.writeText(
        `${quote.verse}\n\n${quote.translation}\n\n~ Bhagavad Gita Ch.${quote.chapter}, Verse ${quote.verse_number}`
      );
      toast.success(t('quoteCopied'));
    }
  };

  const refreshQuote = () => {
    loadDailyQuote();
    toast.success(t('quoteRefreshed'));
  };

  const formattedDate = format(currentDate, "EEEE, MMMM d");

  if (isLoading) {
    return (
      <div className="container max-w-md mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              <span>Gita Wisdom</span>
              <span className="ml-2 text-amber-900">ॐ</span>
            </h1>
            <p className="text-muted-foreground">{format(currentDate, "EEEE, MMMM d")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/profile')}
            >
              <LogIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Welcome</h3>
                <p className="text-sm text-muted-foreground">Sign in to track your progress</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  navigate('/profile');
                }}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Daily Wisdom</h2>
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Begin Your Journey</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="h-6 w-6 mb-2" />
              <span className="text-lg">Chat</span>
              <span className="text-sm text-muted-foreground">Seek Guidance</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate('/karma')}
            >
              <ArrowUpRight className="h-6 w-6 mb-2" />
              <span className="text-lg">Karma</span>
              <span className="text-sm text-muted-foreground">Track your actions</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <LoadingSpinner size={40} className="text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            <span>Gita Wisdom</span>
            <span className="ml-2 text-amber-900">ॐ</span>
          </h1>
          <p className="text-muted-foreground">{format(currentDate, "EEEE, MMMM d")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(true)}
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/profile')}
          >
            <LogIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showSettings && <SettingsMenu onClose={() => setShowSettings(false)} />}

      <Card className="bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t('welcome')}</h3>
              <p className="text-sm text-muted-foreground">{t('signInToTrack')}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                navigate('/profile');
              }}
            >
              <LogIn className="h-4 w-4 mr-2" />
              {t('signIn')}/{t('login')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Karma Tracker</h2>
        <KarmaPreview />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t('dailyWisdom')}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={refreshQuote}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[100px]">
                <LoadingSpinner size={32} />
              </div>
            ) : dailyQuote ? (
              <div className="space-y-4">
                <p className="text-lg">{dailyQuote.text}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">- {dailyQuote.author}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSaveQuote}
                    >
                      <BookMarked className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleShareQuote}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[100px]">
                <LoadingSpinner size={32} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t('beginYourJourney')}</h2>
        <div className="grid grid-cols-1 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex items-center justify-between px-4"
            onClick={() => navigate('/chat')}
          >
            <div className="flex flex-col items-start">
              <span className="text-lg">{t('chat')}</span>
              <span className="text-sm text-muted-foreground">{t('seekGuidance')}</span>
            </div>
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
