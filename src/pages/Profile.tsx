
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BookOpen, MessageCircle, Settings } from "lucide-react";

export default function Profile() {
  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
          <BookOpen size={40} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Gita Wisdom Seeker</h2>
        <p className="text-sm text-muted-foreground">Joined April 2025</p>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Meditation Progress</CardTitle>
          <CardDescription>Track your spiritual journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span>Current Streak</span>
            <span className="font-semibold">0 days</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Sessions</span>
            <span className="font-semibold">0 sessions</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Start Meditation</Button>
        </CardFooter>
      </Card>

      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start" disabled>
          <Bell className="mr-2" size={18} /> Daily Reminders
        </Button>
        <Button variant="outline" className="w-full justify-start" disabled>
          <MessageCircle className="mr-2" size={18} /> Conversation History
        </Button>
        <Button variant="outline" className="w-full justify-start" disabled>
          <Settings className="mr-2" size={18} /> Preferences
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">App Version 1.0.0</p>
        <p className="text-xs text-muted-foreground">Gita Wisdom App</p>
      </div>
    </div>
  );
}
