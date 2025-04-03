
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Beginner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to the exercise player
    toast.info("Starting Level 1: The Awakening");
    navigate('/exercise-player/1');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Redirecting to Level 1...</h1>
        <p className="text-gray-300 mb-8">Preparing your adventure in The Awakening</p>
        <Button
          onClick={() => navigate('/levels')}
          variant="outline"
          className="border-white text-white hover:bg-white/10"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Back to Levels
        </Button>
      </div>
    </div>
  );
};

export default Beginner;
