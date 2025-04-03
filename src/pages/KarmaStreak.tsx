
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Flame, Award, CheckCircle, Users, MapPin, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for leaderboards and tasks
const cityLeaderboard = [
  { rank: 1, name: "Arjuna K.", city: "Delhi", karma: 2145 },
  { rank: 2, name: "Radha S.", city: "Mumbai", karma: 1890 },
  { rank: 3, name: "Krishna G.", city: "Mathura", karma: 1780 },
  { rank: 4, name: "Draupadi P.", city: "Indore", karma: 1650 },
  { rank: 5, name: "Yudhishthira D.", city: "Bangalore", karma: 1520 },
];

const friendsLeaderboard = [
  { rank: 1, name: "Sudama", karma: 1890, relation: "Friend" },
  { rank: 2, name: "You", karma: 1650, relation: "Self" },
  { rank: 3, name: "Balrama", karma: 1520, relation: "Friend" },
  { rank: 4, name: "Subhadra", karma: 1340, relation: "Friend" },
  { rank: 5, name: "Abhimanyu", karma: 1240, relation: "Friend" },
];

const areaLeaderboard = [
  { rank: 1, name: "Dwarka Zone", karma: 8925 },
  { rank: 2, name: "Vrindavan Area", karma: 7840 },
  { rank: 3, name: "Kurukshetra Region", karma: 7350 },
  { rank: 4, name: "Hastinapura District", karma: 6890 },
  { rank: 5, name: "Indraprastha Sector", karma: 6540 },
];

const karmaActs = [
  { 
    id: 1, 
    title: "Practice Devotional Meditation", 
    description: "Spend 10 minutes in quiet meditation focusing on Krishna consciousness.",
    karmaPoints: 50,
    completed: false 
  },
  { 
    id: 2, 
    title: "Selfless Service", 
    description: "Perform one act of service without expectation of reward.",
    karmaPoints: 70,
    completed: false 
  },
  { 
    id: 3, 
    title: "Share Gita Wisdom", 
    description: "Share one teaching from the Bhagavad Gita with someone who might benefit.",
    karmaPoints: 60,
    completed: false 
  },
  { 
    id: 4, 
    title: "Mindful Speech", 
    description: "Practice speaking only truth and kind words throughout the day.",
    karmaPoints: 40,
    completed: false 
  }
];

export default function KarmaStreak() {
  const [tasks, setTasks] = useState(karmaActs);
  const [streak, setStreak] = useState(7); // Example streak count
  const { toast } = useToast();

  const completeTask = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
    
    toast({
      title: "Task completed!",
      description: `+${tasks.find(t => t.id === taskId)?.karmaPoints} karma points added to your total.`,
    });
  };

  return (
    <div className="p-4 pb-16">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-2xl font-serif font-semibold">Karma Streak</h2>
          <Flame className="text-orange-500" size={24} />
        </div>
        <div className="flex justify-center items-center gap-2 text-muted-foreground">
          <span className="font-semibold text-primary">{streak} day streak</span>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle size={20} className="text-green-500" />
            Today's Karma Acts
          </CardTitle>
          <CardDescription>Complete these acts to build good karma</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="flex items-start justify-between border-b pb-3 last:border-0">
              <div>
                <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.title}
                </h4>
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <span className="text-xs font-semibold text-amber-600">+{task.karmaPoints} points</span>
              </div>
              <Button 
                variant={task.completed ? "ghost" : "outline"} 
                size="sm" 
                onClick={() => completeTask(task.id)}
                disabled={task.completed}
                className={task.completed ? 'bg-green-50 text-green-600' : ''}
              >
                {task.completed ? 'Completed' : 'Complete'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Tabs defaultValue="city" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="city" className="flex items-center gap-1">
            <MapPin size={16} /> City
          </TabsTrigger>
          <TabsTrigger value="friends" className="flex items-center gap-1">
            <Users size={16} /> Friends
          </TabsTrigger>
          <TabsTrigger value="area" className="flex items-center gap-1">
            <MapPin size={16} /> Area
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="city">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award size={18} />
                City Leaderboard
              </CardTitle>
              <CardDescription>How you rank in your city</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead className="text-right">Karma</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cityLeaderboard.map((entry) => (
                    <TableRow key={entry.rank}>
                      <TableCell className="font-medium">{entry.rank}</TableCell>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>{entry.city}</TableCell>
                      <TableCell className="text-right">{entry.karma}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="friends">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users size={18} />
                Friends Leaderboard
              </CardTitle>
              <CardDescription>Compare with friends</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Karma</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {friendsLeaderboard.map((entry) => (
                    <TableRow key={entry.rank} className={entry.name === "You" ? "bg-muted/50" : ""}>
                      <TableCell className="font-medium">{entry.rank}</TableCell>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell className="text-right">{entry.karma}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" className="flex items-center gap-2">
                  <UserPlus size={16} />
                  Add Friends
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="area">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin size={18} />
                Area Leaderboard
              </CardTitle>
              <CardDescription>Regional karma rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead className="text-right">Total Karma</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {areaLeaderboard.map((entry) => (
                    <TableRow key={entry.rank}>
                      <TableCell className="font-medium">{entry.rank}</TableCell>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell className="text-right">{entry.karma}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
