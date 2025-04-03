
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Flame, Award } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from a user profile API
  const user = {
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60',
    calories: 1250,
    streak: 7,
    resources: {
      swords: 3,
      fruits: 12,
      food: 8
    },
    badges: [
      { id: 1, name: 'First Workout', icon: '🏆' },
      { id: 2, name: '7 Day Streak', icon: '🔥' },
      { id: 3, name: 'Morning Person', icon: '☀️' },
    ]
  };

  const handleGoToExercises = () => {
    navigate('/beginner'); // Navigate to beginner exercises as default
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header with profile */}
      <header className="w-full bg-gradient-to-r from-blue-700 to-blue-500 py-6 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Fitness Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-blue-100 text-sm">Premium Member</p>
            </div>
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6">
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Calories Card */}
          <Card className="bg-gradient-to-br from-orange-500 to-amber-600 border-none text-white">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-2">Total Calories Burned</h3>
              <p className="text-4xl font-bold">{user.calories}</p>
              <p className="text-sm opacity-90 mt-1">This week</p>
            </CardContent>
          </Card>

          {/* Streak Card */}
          <Card className="bg-gradient-to-br from-red-500 to-rose-600 border-none text-white">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium">Current Streak</h3>
                <Flame className="h-5 w-5" />
              </div>
              <p className="text-4xl font-bold">{user.streak} days</p>
              <p className="text-sm opacity-90 mt-1">Keep it going!</p>
            </CardContent>
          </Card>

          {/* Resources Card */}
          <Card className="bg-gradient-to-br from-emerald-500 to-green-600 border-none text-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4 text-center">Resources</h3>
              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">⚔️</span>
                  <p className="text-xl font-bold mt-1">{user.resources.swords}</p>
                  <p className="text-xs">Swords</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">🍎</span>
                  <p className="text-xl font-bold mt-1">{user.resources.fruits}</p>
                  <p className="text-xs">Fruits</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">🍗</span>
                  <p className="text-xl font-bold mt-1">{user.resources.food}</p>
                  <p className="text-xs">Food</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="mb-20">
          <div className="flex items-center mb-4">
            <Award className="mr-2 text-blue-500" />
            <h2 className="text-2xl font-bold text-white">Badges</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.badges.map((badge) => (
              <Card key={badge.id} className="hover:shadow-lg transition-shadow border-none bg-slate-800 text-white">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className="font-medium text-center">{badge.name}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="border-dashed border-2 border-gray-600 bg-transparent hover:bg-slate-800/30 transition-colors cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-gray-400">
                <p className="text-4xl mb-2">+</p>
                <p className="font-medium">More to earn</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Fixed Bottom Right Button */}
        <div className="fixed bottom-8 right-8">
          <Button
            onClick={handleGoToExercises}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-6 flex items-center gap-2 shadow-lg"
          >
            <span className="font-medium">Go to today's exercises</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
