
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import confetti from 'canvas-confetti';

interface Flag {
  name: string;
  code: string;
}

const FLAGS: Flag[] = [
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "France", code: "fr" },
  { name: "Germany", code: "de" },
  { name: "Italy", code: "it" },
  { name: "Spain", code: "es" },
  { name: "Portugal", code: "pt" },
  { name: "Netherlands", code: "nl" },
  { name: "Belgium", code: "be" },
  { name: "Sweden", code: "se" },
];

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentFlag, setCurrentFlag] = useState<Flag | null>(null);
  const [options, setOptions] = useState<Flag[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const shuffleArray = (array: Flag[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateQuestion = () => {
    const shuffledFlags = shuffleArray(FLAGS);
    const correctFlag = shuffledFlags[0];
    const wrongOptions = shuffledFlags.slice(1, 4);
    setCurrentFlag(correctFlag);
    setOptions(shuffleArray([correctFlag, ...wrongOptions]));
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setAttempts(0);
    generateQuestion();
  };

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
      });
      generateQuestion();
    } else {
      toast.error("Try again!", {
        duration: 2000,
      });
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <div className="text-center fade-scale-enter">
          <h1 className="text-4xl font-bold mb-4 floating">
            Flag Guessing Game
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Learn about countries and their flags in a fun way!
          </p>
          <Button 
            onClick={startGame}
            className="game-button bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start Playing!
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
      <div className="text-center mb-8">
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

      <Button 
        onClick={() => setGameStarted(false)}
        variant="outline"
        className="mt-4"
      >
        Back to Start
      </Button>
    </div>
  );
};

export default Index;
