
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { toast } from 'sonner';

interface Exercise {
  id: number;
  name: string;
  count: string;
  countType: 'reps' | 'time';
  image: string;
}

const ExercisePlayer = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showBreak, setShowBreak] = useState(false);
  const [breakTimeRemaining, setBreakTimeRemaining] = useState(20);
  const [exerciseProgress, setExerciseProgress] = useState(0);
  
  // Get exercises based on level
  const exercises = getExercisesForLevel(level);
  
  useEffect(() => {
    if (showBreak) {
      const timer = setInterval(() => {
        setBreakTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowBreak(false);
            setBreakTimeRemaining(20);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [showBreak]);
  
  useEffect(() => {
    // Update the progress indicator
    const progress = ((currentExerciseIndex) / exercises.length) * 100;
    setExerciseProgress(progress);
  }, [currentExerciseIndex, exercises.length]);
  
  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      // If not the last exercise, show break screen
      setShowBreak(true);
      setTimeout(() => {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }, 20000); // Show next exercise after break
    } else {
      // Complete workout
      toast.success("Workout completed! Returning to levels page.");
      setTimeout(() => navigate('/levels'), 1500);
    }
  };
  
  const handleSkipBreak = () => {
    setShowBreak(false);
    setBreakTimeRemaining(20);
    setCurrentExerciseIndex(currentExerciseIndex + 1);
  };
  
  const currentExercise = exercises[currentExerciseIndex];
  
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 p-4 flex items-center justify-between sticky top-0 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/levels')}
          className="text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold text-white">Level {level} Adventure</h1>
          <div className="w-48 mt-2">
            <Progress value={exerciseProgress} className="h-2" />
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/levels')}
          className="text-white"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {showBreak ? (
          /* Break Screen */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="text-5xl font-bold text-purple-400 mb-4">REST</div>
            <div className="w-48 h-48 rounded-full bg-purple-800 flex items-center justify-center mb-8 text-4xl font-bold text-white">
              {breakTimeRemaining}s
            </div>
            <p className="text-gray-300 text-xl mb-8">
              Take a deep breath before the next challenge
            </p>
            <Button 
              onClick={handleSkipBreak}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg"
            >
              Skip Rest
            </Button>
          </div>
        ) : (
          /* Exercise Screen */
          <div className="flex-1 flex flex-col p-4">
            <div className="bg-slate-800 rounded-lg overflow-hidden flex-1 flex flex-col mb-4">
              <div className="relative h-64 sm:h-80 md:h-96 bg-slate-700">
                <img 
                  src={currentExercise.image} 
                  alt={currentExercise.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-2xl font-bold text-white">{currentExercise.name}</h2>
                  <div className="text-purple-300 text-lg">{currentExercise.count}</div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="text-center">
                  <p className="text-gray-300 text-lg">{getExerciseInstructions(currentExercise.name)}</p>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-400 mb-2">Exercise {currentExerciseIndex + 1} of {exercises.length}</p>
                  <Button 
                    onClick={handleNext}
                    className="w-full md:w-80 bg-purple-600 hover:bg-purple-700 py-6 text-xl rounded-full"
                  >
                    {currentExerciseIndex < exercises.length - 1 ? (
                      <>
                        Complete & Continue
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </>
                    ) : (
                      "Complete Workout"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get exercises for specific level
function getExercisesForLevel(level: string | undefined): Exercise[] {
  switch(level) {
    case "1":
      return [
        {
          id: 1,
          name: "Jumping Jacks",
          count: "00:20",
          countType: 'time',
          image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 2,
          name: "Knee Push-Ups",
          count: "x10",
          countType: 'reps',
          image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 3,
          name: "Wall Sit",
          count: "00:30",
          countType: 'time',
          image: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 4,
          name: "Arm Circles",
          count: "x12",
          countType: 'reps',
          image: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      ];
    case "2":
      return [
        {
          id: 1,
          name: "Push-Ups",
          count: "x8",
          countType: 'reps',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 2,
          name: "Cobra Stretch",
          count: "00:20",
          countType: 'time',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 3,
          name: "Mountain Climber",
          count: "x16",
          countType: 'reps',
          image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 4,
          name: "Wide Arm Push-Ups",
          count: "x8",
          countType: 'reps',
          image: 'https://images.unsplash.com/photo-1566351557863-3e58081256d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      ];
    case "3":
      return [
        {
          id: 1,
          name: "Side Plank Left",
          count: "15 Reps",
          countType: 'reps',
          image: 'https://images.unsplash.com/photo-1616279967983-ec413476e824?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 2,
          name: "Jumping Jacks",
          count: "00:30",
          countType: 'time',
          image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 3,
          name: "Mountain Climber",
          count: "20 Reps",
          countType: 'reps',
          image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 4,
          name: "Burpees",
          count: "x12",
          countType: 'reps',
          image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      ];
    default:
      return [
        {
          id: 1,
          name: "Jumping Jacks",
          count: "00:20",
          countType: 'time',
          image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 2,
          name: "Knee Push-Ups",
          count: "x10",
          countType: 'reps',
          image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 3,
          name: "Wall Sit",
          count: "00:30",
          countType: 'time',
          image: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          id: 4,
          name: "Arm Circles",
          count: "x12",
          countType: 'reps',
          image: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      ];
  }
}

// Function to provide instructions for each exercise
function getExerciseInstructions(exerciseName: string): string {
  const instructions: {[key: string]: string} = {
    "Jumping Jacks": "Stand upright with your legs together and arms at your sides. Jump up, spreading your legs and raising your arms above your head. Jump again, returning to the starting position.",
    "Knee Push-Ups": "Start in a plank position with your knees on the ground. Lower your chest toward the ground by bending your elbows, then push back up.",
    "Wall Sit": "Lean against a wall with your feet shoulder-width apart. Slide down until your knees are at a 90-degree angle. Hold the position.",
    "Arm Circles": "Stand with your arms extended to the sides at shoulder height. Make small circles with your arms, gradually increasing the size of the circles.",
    "Push-Ups": "Start in a plank position with hands slightly wider than shoulder-width. Lower your body until your chest nearly touches the floor, then push yourself back up.",
    "Cobra Stretch": "Lie face down with hands under shoulders. Push your chest up while keeping hips on the floor. Hold the stretch while breathing deeply.",
    "Mountain Climber": "Start in a plank position. Alternate bringing each knee toward your chest in a running motion.",
    "Wide Arm Push-Ups": "Perform push-ups with your hands placed wider than shoulder-width apart to focus more on your chest muscles.",
    "Side Plank Left": "Lie on your left side with your left elbow directly beneath your shoulder. Lift your hips to create a straight line from head to feet. Hold the position.",
    "Burpees": "Begin standing, then squat and place hands on the floor. Jump feet back to a plank, do a push-up, jump feet back to squat, then explode up into a jump."
  };
  
  return instructions[exerciseName] || "Perform the exercise with proper form and controlled movements.";
}

export default ExercisePlayer;
