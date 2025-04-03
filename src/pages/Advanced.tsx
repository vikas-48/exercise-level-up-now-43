
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MoreVertical, Menu, ShuffleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface Exercise {
  id: number;
  name: string;
  count: string;
  countType: 'reps' | 'time';
  image: string;
}

const advancedExercises: Exercise[] = [
  {
    id: 1,
    name: 'Side Plank Left',
    count: '15 Reps',
    countType: 'reps',
    image: 'https://images.unsplash.com/photo-1616279967983-ec413476e824?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    name: 'Jumping Jacks',
    count: '00:30',
    countType: 'time',
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    name: 'Mountain Climber',
    count: '20 Reps',
    countType: 'reps',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    name: 'Burpees',
    count: 'x12',
    countType: 'reps',
    image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

const Advanced = () => {
  const navigate = useNavigate();
  const [exercises] = useState<Exercise[]>(advancedExercises);

  const handleStart = () => {
    toast.success("Workout started! This would normally start the exercise sequence.");
  };

  const handleAdjust = () => {
    toast.info("This would open exercise adjustment options.");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Day 1</h1>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>

      {/* Workout Summary */}
      <div className="bg-gray-50 p-6">
        <h2 className="text-4xl font-bold mb-8">DAY 1</h2>
        <div className="flex gap-4">
          <div className="bg-white rounded-xl p-6 flex-1 shadow-sm">
            <span className="text-2xl font-bold">20 mins</span>
            <p className="text-gray-500">Duration</p>
          </div>
          <div className="bg-white rounded-xl p-6 flex-1 shadow-sm">
            <span className="text-2xl font-bold">4</span>
            <p className="text-gray-500">Exercises</p>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex-1 p-4">
        <h3 className="text-2xl font-bold mb-4">Exercises</h3>
        
        <div className="space-y-4">
          {exercises.map((exercise) => (
            <React.Fragment key={exercise.id}>
              <div className="flex items-center py-2">
                <Menu className="text-gray-400 mr-4" />
                <div className="w-16 h-16 bg-gray-100 rounded-lg mr-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={exercise.image} 
                    alt={exercise.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold">{exercise.name}</h4>
                  <p className="text-gray-500">{exercise.count}</p>
                </div>
                <ShuffleIcon className="text-gray-400" />
              </div>
              <Separator />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="sticky bottom-0 p-4 bg-white border-t">
        <div className="flex justify-between mb-4">
          <Button 
            variant="outline" 
            className="bg-gray-800 text-white hover:bg-gray-700 rounded-full flex items-center gap-2 px-6"
            onClick={handleAdjust}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2"/>
              <circle cx="6" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Adjust
          </Button>
        </div>
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-full text-xl"
          onClick={handleStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default Advanced;
