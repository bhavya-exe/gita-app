import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, MessageCircle, Settings, Bookmark, ChevronRight, BookOpen, Timer, BarChart2, Calendar, Target, Languages, Trash2, Twitter, Facebook, Copy } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';

interface UserStats {
  totalPractices: number;
  completedPractices: number;
  savedQuotes: number;
  currentStreak: number;
  longestStreak: number;
  totalTime: number;
  favoriteQuotes: number;
}

interface Practice {
  id: string;
  name: string;
  duration: number;
  completed: boolean;
}

interface SavedQuote {
  id: string;
  text: string;
  source: string;
  date: string;
}

interface Chapter {
  id: number;
  title: string;
  verses: number;
  audioUrl: string;
}

interface Translation {
  id: string;
  name: string;
  language: string;
  author: string;
  description: string;
}

const translations: Translation[] = [
  {
    id: 'swamiPrabhupada',
    name: 'Bhagavad Gita As It Is',
    language: 'English',
    author: 'A.C. Bhaktivedanta Swami Prabhupada',
    description: 'The most widely read translation with detailed purports'
  },
  {
    id: 'swamiMukundananda',
    name: 'Bhagavad Gita - The Song of God',
    language: 'English',
    author: 'Swami Mukundananda',
    description: 'Modern translation with practical insights'
  },
  {
    id: 'swamiChinmayananda',
    name: 'The Holy Geeta',
    language: 'English',
    author: 'Swami Chinmayananda',
    description: 'Classic commentary with philosophical depth'
  }
];

const chapters: Chapter[] = [
  { id: 1, title: 'Arjuna Vishada Yoga', verses: 47, audioUrl: '/audio/chapter1.mp3' },
  { id: 2, title: 'Sankhya Yoga', verses: 72, audioUrl: '/audio/chapter2.mp3' },
  // Add more chapters as needed
];

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<SavedQuote | null>(null);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [stats, setStats] = useState<UserStats>({
    totalPractices: 0,
    completedPractices: 0,
    savedQuotes: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalTime: 0,
    favoriteQuotes: 0
  });
  const [selectedTranslation, setSelectedTranslation] = useState<string>('swamiPrabhupada');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadSavedQuotes();
    loadStats();
  }, []);

  const loadSavedQuotes = () => {
    const quotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]');
    setSavedQuotes(quotes);
    setStats(prev => ({ ...prev, savedQuotes: quotes.length }));
  };

  const loadStats = () => {
    const savedPractices = localStorage.getItem('dailyPractices');
    if (savedPractices) {
      const practices = JSON.parse(savedPractices) as Practice[];
      const completed = practices.filter(p => p.completed).length;
      setStats(prev => ({
        ...prev,
        totalPractices: practices.length,
        completedPractices: completed,
      }));
    }

    const streakData = localStorage.getItem('streakData');
    if (streakData) {
      const { currentStreak, longestStreak } = JSON.parse(streakData);
      setStats(prev => ({
        ...prev,
        currentStreak,
        longestStreak,
      }));
    }
  };

  const calculatePracticeProgress = () => {
    if (stats.totalPractices === 0) return 0;
    return (stats.completedPractices / stats.totalPractices) * 100;
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast.success(`Notifications ${notifications ? 'Disabled' : 'Enabled'}`);
  };

  const handleDeleteQuote = (id: string) => {
    const updatedQuotes = savedQuotes.filter(quote => quote.id !== id);
    setSavedQuotes(updatedQuotes);
    localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
    setStats(prev => ({ ...prev, savedQuotes: updatedQuotes.length }));
    toast.success(t('quoteDeleted'));
  };

  const handleShare = (platform: string) => {
    if (!selectedQuote) return;

    const text = `${selectedQuote.text}\n\n- ${selectedQuote.source}`;
    const encodedText = encodeURIComponent(text);

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`, '_blank');
        break;
    }
    toast.success(t('quoteShared'));
  };

  const handleCopy = () => {
    if (!selectedQuote) return;
    navigator.clipboard.writeText(`${selectedQuote.text}\n\n- ${selectedQuote.source}`);
    toast.success(t('quoteCopied'));
  };

  const handlePlayAudio = (chapter: Chapter) => {
    if (currentChapter?.id === chapter.id) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentChapter(chapter);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = chapter.audioUrl;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('profile')}</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/profile')}
        >
          {t('editProfile')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('yourStatistics')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t('totalPractices')}</span>
              <span className="text-sm font-medium">{stats.totalPractices}</span>
            </div>
            <Progress value={calculatePracticeProgress()} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t('completedPractices')}</p>
              <p className="text-2xl font-bold">{stats.completedPractices}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t('savedQuotes')}</p>
              <p className="text-2xl font-bold">{stats.savedQuotes}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t('currentStreak')}</p>
              <p className="text-2xl font-bold">{stats.currentStreak} days</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t('longestStreak')}</p>
              <p className="text-2xl font-bold">{stats.longestStreak} days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            {t('savedQuotes')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedQuotes.length === 0 ? (
            <p className="text-center text-muted-foreground">{t('noSavedQuotes')}</p>
          ) : (
            <div className="space-y-4">
              {savedQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="p-4 bg-card rounded-lg shadow"
                >
                  <p className="text-lg mb-2">{quote.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{quote.source}</span>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedQuote(quote)}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t('shareQuote')}</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-2 mt-4">
                            <Button onClick={() => handleShare('twitter')}>
                              <Twitter className="h-4 w-4 mr-2" />
                              Twitter
                            </Button>
                            <Button onClick={() => handleShare('facebook')}>
                              <Facebook className="h-4 w-4 mr-2" />
                              Facebook
                            </Button>
                            <Button onClick={handleCopy} className="col-span-2">
                              <Copy className="h-4 w-4 mr-2" />
                              {t('copy')}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuote(quote.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t('settings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              <span>{t('language')}</span>
            </div>
            <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'hi' | 'sa')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('language')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="sa">संस्कृतम्</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('dailyReminders')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('receiveDailyWisdom')}
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={toggleNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => {
            toast.success("Coming Soon: This feature will be available in the next update!");
          }}
        >
          <MessageCircle className="mr-2" size={18} /> Conversation History
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => {
            toast.success("Coming Soon: Advanced preferences will be available soon!");
          }}
        >
          <Settings className="mr-2" size={18} /> Advanced Preferences
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">App Version 1.0.1</p>
        <p className="text-xs text-muted-foreground">Gita Wisdom App</p>
      </div>

      {/* Gita Reading Section */}
      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-bold">{t('gitaReading.title')}</h2>
        
        {/* Translation Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t('gitaReading.selectTranslation')}
          </label>
          <Select
            value={selectedTranslation}
            onValueChange={setSelectedTranslation}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('gitaReading.selectTranslation')} />
            </SelectTrigger>
            <SelectContent>
              {translations.map((translation) => (
                <SelectItem key={translation.id} value={translation.id}>
                  {translation.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Translation Details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            {translations.find(t => t.id === selectedTranslation) && (
              <>
                <h3 className="text-xl font-semibold">
                  {translations.find(t => t.id === selectedTranslation)?.name}
                </h3>
                <p className="text-muted-foreground">
                  {translations.find(t => t.id === selectedTranslation)?.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {translations.find(t => t.id === selectedTranslation)?.description}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Chapters List */}
        <div className="grid gap-4">
          {chapters.map((chapter) => (
            <Card key={chapter.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{chapter.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {chapter.verses} {t('gitaReading.verses')}
                    </p>
                  </div>
                  <Button
                    onClick={() => handlePlayAudio(chapter)}
                    variant={currentChapter?.id === chapter.id && isPlaying ? "secondary" : "default"}
                    size="sm"
                  >
                    {currentChapter?.id === chapter.id && isPlaying
                      ? t('gitaReading.pauseAudio')
                      : t('gitaReading.playAudio')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentChapter(null);
        }}
      />

      {/* ... existing quote dialog ... */}
    </div>
  );
}
