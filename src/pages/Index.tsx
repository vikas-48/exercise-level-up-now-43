
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleLevelSelect = (level: string) => {
    navigate(`/${level.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-blue-700 to-blue-500 py-8 px-4">
        <h1 className="text-3xl font-bold text-white text-center">Level Up Now</h1>
        <p className="text-white text-center mt-2">Choose your workout level</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col gap-6 max-w-md mx-auto w-full">
        <Card className="overflow-hidden border-2 border-blue-500 hover:shadow-lg transition-all">
          <div className="h-40 bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center">
            <img 
              src="/lovable-uploads/79c9c213-eb6d-40d5-97d3-216af3f09a8b.png" 
              alt="Beginner Workout" 
              className="h-full object-cover opacity-70"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Beginner</h2>
                <p className="text-gray-500">4 exercises • 10 mins</p>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-blue-500"
                onClick={() => handleLevelSelect('Beginner')}
              >
                <ChevronRight className="h-5 w-5 text-blue-500" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-2 border-blue-500 hover:shadow-lg transition-all">
          <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-400 flex items-center justify-center">
            <img 
              src="/lovable-uploads/565d94c9-1282-4ab0-86d4-3140aca3ca11.png" 
              alt="Intermediate Workout" 
              className="h-full object-cover opacity-70"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Intermediate</h2>
                <p className="text-gray-500">4 exercises • 15 mins</p>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-blue-500"
                onClick={() => handleLevelSelect('Intermediate')}
              >
                <ChevronRight className="h-5 w-5 text-blue-500" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-2 border-blue-500 hover:shadow-lg transition-all">
          <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center">
            <img 
              src="/lovable-uploads/979378fb-494b-45e2-bfa2-acb2cac70e38.png" 
              alt="Advanced Workout" 
              className="h-full object-cover opacity-70"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Advanced</h2>
                <p className="text-gray-500">4 exercises • 20 mins</p>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-blue-500"
                onClick={() => handleLevelSelect('Advanced')}
              >
                <ChevronRight className="h-5 w-5 text-blue-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
