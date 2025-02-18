
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import confetti from 'canvas-confetti';
import { COUNTRIES } from "@/data/countries";
import { DifficultyLevel, Flag } from "@/types/game";

interface FlagGameProps {
  difficulty: DifficultyLevel;
  onBack: () => void;
}

export const FlagGame = ({ difficulty, onBack }: FlagGameProps) => {
  const [currentFlag, setCurrentFlag] = useState<Flag | null>(null);
  const [options, setOptions] = useState<Flag[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const shuffleArray = (array: Flag[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateQuestion = () => {
    const flagPool = COUNTRIES[difficulty];
    const shuffledFlags = shuffleArray(flagPool);
    const correctFlag = shuffledFlags[0];
    const wrongOptions = shuffledFlags.slice(1, 4);
    setCurrentFlag(correctFlag);
    setOptions(shuffleArray([correctFlag, ...wrongOptions]));
    setShowHint(false);
  };

  useEffect(() => {
    generateQuestion();
  }, [difficulty]);

  const handleGuess = (flag: Flag) => {
    setAttempts(prev => prev + 1);
    
    if (flag.code === currentFlag?.code) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setScore(prev => prev + 1);
      toast.success("Correct! Well done!", {
        duration: 2000,
        position: "top-center",
        className: "text-xl font-bold"
      });
      generateQuestion();
    } else {
      toast.error("Try again!", {
        duration: 2000,
        position: "top-center",
        className: "text-xl font-bold"
      });
    }
  };

  const showHintToast = () => {
    if (currentFlag?.hint) {
      setShowHint(true);
      toast.info(currentFlag.hint, {
        duration: 4000,
        position: "top-center",
        className: "text-xl font-bold"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 capitalize">
          {difficulty} Level
        </h2>
        <p className="text-lg font-medium">
          Score: {score} / {attempts}
        </p>
      </div>

      <Card className="w-full max-w-2xl p-6 fade-scale-enter">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Which country does this flag belong to?
          </h2>
          {currentFlag && (
            <img
              src={`https://flagcdn.com/w320/${currentFlag.code}.png`}
              alt="Flag to guess"
              className="mx-auto rounded-xl shadow-lg mb-6 floating"
              style={{ maxWidth: '320px' }}
            />
          )}
          <Button
            onClick={showHintToast}
            variant="outline"
            className="mb-4"
            disabled={showHint}
          >
            {showHint ? "Hint Shown" : "Show Hint"}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((flag) => (
            <button
              key={flag.code}
              onClick={() => handleGuess(flag)}
              className="game-button bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              {flag.name}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex gap-4">
        <Button 
          onClick={onBack}
          variant="outline"
        >
          Choose Different Level
        </Button>
        <Button 
          onClick={() => {
            setScore(0);
            setAttempts(0);
            generateQuestion();
          }}
          variant="outline"
        >
          Restart Level
        </Button>
      </div>
    </div>
  );
};
