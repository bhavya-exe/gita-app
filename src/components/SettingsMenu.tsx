
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Sun, MoonStar, Globe } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/contexts/LanguageContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";

interface SettingsMenuProps {
  onClose: () => void;
}

export function SettingsMenu({ onClose }: SettingsMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('settings')}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{t('appearance')}</h3>
            <div className="flex items-center justify-between">
              <span>{t('darkMode')}</span>
              <Toggle 
                pressed={theme === 'dark'} 
                onPressedChange={() => toggleTheme()}
              >
                {theme === 'dark' ? <MoonStar className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                {theme === 'dark' ? t('darkMode') : t('lightMode')}
              </Toggle>
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{t('language')}</h3>
            <RadioGroup 
              value={language} 
              onValueChange={(value) => setLanguage(value as 'en' | 'hi')}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="en" />
                <Label htmlFor="en">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hi" id="hi" />
                <Label htmlFor="hi">हिंदी (Hindi)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{t('accessibility')}</h3>
            <div className="flex items-center space-x-2">
              <Toggle className="w-full">
                <span>{t('largerText')}</span>
              </Toggle>
            </div>
          </div>
          
          {/* Notification Settings (placeholder) */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{t('notifications')}</h3>
            <div className="flex items-center space-x-2">
              <Toggle className="w-full">
                <span>{t('dailyReminders')}</span>
              </Toggle>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
