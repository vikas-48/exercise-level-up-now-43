
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Lock, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';

interface Level {
  id: number;
  name: string;
  description: string;
  image: string;
  story: string;
  isLocked: boolean;
}

const Levels = () => {
  const navigate = useNavigate();
  const [openStoryId, setOpenStoryId] = useState<number | null>(null);

  const levels: Level[] = [
    {
      id: 1,
      name: "The Awakening",
      description: "Defeat Var'Zul the Corrupter",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      story: "The realm of Eldoria was once peaceful until the Shadow Demons emerged from the Abyss. You are Kael, a warrior chosen by destiny to restore balance. Armed with only a basic sword, you set off towards the Ruins of Ignis, where the first demon, Var'Zul the Corrupter, has poisoned the land.",
      isLocked: false
    },
    {
      id: 2,
      name: "The Cursed Fortress",
      description: "Break the spell of Lady Nyx",
      image: "https://images.unsplash.com/photo-1565130838609-c3a86655db61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      story: "With Var'Zul defeated, you enter the Fortress of Shadows, home to Lady Nyx, a demon who traps souls in eternal darkness. The fortress is enchanted with deadly obstacles and shadow traps. Only by breaking her spell can you restore light to Eldoria.",
      isLocked: false
    },
    {
      id: 3,
      name: "The Final Trial - Abyss of Torment",
      description: "Confront Demon Lord Malakar",
      image: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      story: "The final challenge awaits in the Abyss of Torment, home to the Demon Lord Malakar, ruler of the underworld. He has enslaved the spirits of fallen warriors, drawing power from their suffering. You must confront Malakar and free their souls to save Eldoria.",
      isLocked: false
    },
    {
      id: 4,
      name: "The Forgotten Temple",
      description: "Retrieve the Crystal of Elements",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      story: "A mystical temple hidden deep in the mountains holds the Crystal of Elements, an artifact of immense power. Dark forces seek to claim it for themselves.",
      isLocked: true
    },
    {
      id: 5,
      name: "The Submerged City",
      description: "Find the Trident of the Deep",
      image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      story: "Beneath the waves lies a city once home to an advanced civilization. Its treasures remain unclaimed, but deadly guardians protect its secrets.",
      isLocked: true
    },
    {
      id: 6,
      name: "The Celestial Tower",
      description: "Reach the summit and claim your destiny",
      image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      story: "A tower that reaches the heavens, said to grant immense power to those who can overcome its trials. Many have tried, none have succeeded.",
      isLocked: true
    }
  ];

  const handleStartLevel = (levelId: number) => {
    const level = levels.find(l => l.id === levelId);
    
    if (level?.isLocked) {
      toast.error("This level is locked! Complete previous levels first.");
      return;
    }
    
    // Redirect to the exercise player for this level
    navigate(`/exercise-player/${levelId}`);
  };

  const handleOpenStory = (levelId: number) => {
    const level = levels.find(l => l.id === levelId);
    
    if (level?.isLocked) {
      toast.error("This level is locked! Complete previous levels first.");
      return;
    }
    
    setOpenStoryId(levelId);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white mr-4"
            onClick={() => navigate('/dashboard')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold text-white">Adventure Levels</h1>
        </div>
      </header>

      {/* Level Grid */}
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => (
            <Card 
              key={level.id} 
              className={`overflow-hidden border-2 ${level.isLocked ? 'border-gray-600 opacity-80' : 'border-purple-500'} hover:shadow-lg transition-all`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={level.image} 
                  alt={level.name} 
                  className="w-full h-full object-cover"
                />
                {level.isLocked && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <Lock size={40} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Level {level.id}
                </div>
              </div>
              
              <CardContent className="p-4">
                <h2 className="text-xl font-bold text-white mb-1">{level.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{level.description}</p>
                
                <div className="flex justify-between gap-2">
                  <Dialog open={openStoryId === level.id} onOpenChange={(open) => !open && setOpenStoryId(null)}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className={`flex-1 ${!level.isLocked ? 'border-purple-500 text-purple-500 hover:bg-purple-950' : 'border-gray-600 text-gray-600'}`}
                        onClick={() => handleOpenStory(level.id)}
                        disabled={level.isLocked}
                      >
                        View Story
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-purple-700 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-purple-400">Level {level.id}: {level.name}</DialogTitle>
                      </DialogHeader>
                      <div className="my-4">
                        <img 
                          src={level.image} 
                          alt={level.name} 
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <DialogDescription className="text-gray-300 text-lg leading-relaxed">
                          {level.story}
                        </DialogDescription>
                      </div>
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => {
                          setOpenStoryId(null);
                          handleStartLevel(level.id);
                        }}
                      >
                        Begin Adventure
                      </Button>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    className={`flex-1 ${!level.isLocked ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700'}`}
                    onClick={() => handleStartLevel(level.id)}
                    disabled={level.isLocked}
                  >
                    Start Level
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Levels;
