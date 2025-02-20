
import { useState, useEffect } from 'react';
import { toast } from "sonner";
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
  const [usedFlags, setUsedFlags] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const totalFlags = COUNTRIES[difficulty].length;

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
    const availableFlags = flagPool.filter(flag => !usedFlags.has(flag.code));
    
    if (availableFlags.length < 4) {
      setUsedFlags(new Set());
      const shuffledFlags = shuffleArray(flagPool);
      const correctFlag = shuffledFlags[0];
      const wrongOptions = shuffledFlags.slice(1, 4);
      setCurrentFlag(correctFlag);
      setOptions(shuffleArray([correctFlag, ...wrongOptions]));
    } else {
      const shuffledFlags = shuffleArray(availableFlags);
      const correctFlag = shuffledFlags[0];
      const wrongOptions = shuffledFlags.slice(1, 4);
      setCurrentFlag(correctFlag);
      setOptions(shuffleArray([correctFlag, ...wrongOptions]));
      setUsedFlags(prev => new Set([...prev, correctFlag.code]));
    }
  };

  useEffect(() => {
    setScore(0);
    setUsedFlags(new Set());
    setShowHint(false);
    generateQuestion();
  }, [difficulty]);

  const handleGuess = (flag: Flag) => {
    if (flag.code === currentFlag?.code) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setScore(prev => prev + 1);
      toast.success("Correct! Well done!", {
        position: "top-center"
      });
      setShowHint(false);
      generateQuestion();
    } else {
      toast.error("Try again!", {
        position: "top-center"
      });
    }
  };

  const showHintToast = () => {
    if (currentFlag?.hint) {
      setShowHint(true);
      toast.info(currentFlag.hint, {
        position: "top-center",
        duration: 4000
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2 capitalize">
          {difficulty} Level
        </h2>
        <p className="text-lg font-medium">
          Score: {score} / {totalFlags}
        </p>
      </div>

      <Card className="w-full max-w-xl p-4 fade-scale-enter">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold mb-4">
            Which country does this flag belong to?
          </h2>
          {currentFlag && (
            <img
              src={`https://flagcdn.com/w320/${currentFlag.code}.png`}
              alt={`Flag of ${currentFlag.name}`}
              className="mx-auto rounded-xl shadow-lg mb-4 floating"
              style={{ maxWidth: '280px' }}
            />
          )}
          <Button
            onClick={showHintToast}
            variant="outline"
            className="mb-6"
            disabled={showHint}
          >
            {showHint ? "Hint Shown" : "Show Hint"}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

      <div className="flex gap-4 mt-4">
        <Button 
          onClick={onBack}
          variant="outline"
        >
          Choose Different Level
        </Button>
        <Button 
          onClick={() => {
            setScore(0);
            setUsedFlags(new Set());
            setShowHint(false);
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
