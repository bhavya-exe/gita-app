
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '@/contexts/LanguageContext';

export default function KarmaPreview() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('karmaStreak');
    return saved ? JSON.parse(saved) : 0;
  });
  const [karmaPoints, setKarmaPoints] = useState(() => {
    const saved = localStorage.getItem('karmaPoints');
    return saved ? JSON.parse(saved) : 0;
  });

  return (
    <Card className="p-4 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/karma-detailed')}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{t('karma')}</h2>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="text-xl font-bold">{streak}</span>
          <span className="text-xs text-muted-foreground">days</span>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-xl font-bold">{karmaPoints}</span>
          <span className="text-xs text-muted-foreground">karma</span>
        </div>
      </div>
    </Card>
  );
}
