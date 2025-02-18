
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import confetti from 'canvas-confetti';

interface Flag {
  name: string;
  code: string;
  hint?: string;
}

// Countries organized by difficulty
const COUNTRIES = {
  easy: [
    { name: "United States", code: "us", hint: "Home of Hollywood and the Statue of Liberty" },
    { name: "United Kingdom", code: "gb", hint: "Home of Big Ben and the Queen" },
    { name: "France", code: "fr", hint: "Home of the Eiffel Tower" },
    { name: "Japan", code: "jp", hint: "Land of the Rising Sun" },
    { name: "Brazil", code: "br", hint: "Famous for carnival and soccer" },
    { name: "Canada", code: "ca", hint: "Known for maple syrup" },
    { name: "Australia", code: "au", hint: "Home to kangaroos" },
    // ... Adding more easy countries here
  ],
  moderate: [
    { name: "Spain", code: "es", hint: "Known for flamenco dance" },
    { name: "Italy", code: "it", hint: "Famous for pizza and pasta" },
    { name: "Germany", code: "de", hint: "Known for automobiles" },
    { name: "India", code: "in", hint: "Land of the Taj Mahal" },
    { name: "Mexico", code: "mx", hint: "Known for tacos and pyramids" },
    // ... Adding more moderate countries here
  ],
  difficult: [
    { name: "Thailand", code: "th", hint: "Land of Smiles" },
    { name: "Egypt", code: "eg", hint: "Land of the pyramids" },
    { name: "Turkey", code: "tr", hint: "Where Europe meets Asia" },
    { name: "South Africa", code: "za", hint: "Rainbow Nation" },
    // ... Adding more difficult countries here
  ],
  hard: [
    { name: "Kazakhstan", code: "kz", hint: "Largest landlocked country" },
    { name: "Uruguay", code: "uy", hint: "Known for mate tea" },
    { name: "Vietnam", code: "vn", hint: "Famous for Ha Long Bay" },
    // ... Adding more hard countries here
  ],
  impossible: [
    { name: "Kiribati", code: "ki", hint: "Pacific island nation" },
    { name: "Tuvalu", code: "tv", hint: "Smallest UN member state" },
    { name: "Vanuatu", code: "vu", hint: "South Pacific archipelago" },
    // ... Adding more impossible countries here
  ]
};

type DifficultyLevel = 'easy' | 'moderate' | 'difficult' | 'hard' | 'impossible';

const DIFFICULTY_COLORS = {
  easy: 'bg-green-500',
  moderate: 'bg-yellow-500',
  difficult: 'bg-orange-500',
  hard: 'bg-red-500',
  impossible: 'bg-purple-500',
};

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentFlag, setCurrentFlag] = useState<Flag | null>(null);
  const [options, setOptions] = useState<Flag[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [difficulty, setDifficulty] = useState<DifficultyLevel | null>(null);
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
    if (!difficulty) return;
    const flagPool = COUNTRIES[difficulty];
    const shuffledFlags = shuffleArray(flagPool);
    const correctFlag = shuffledFlags[0];
    const wrongOptions = shuffledFlags.slice(1, 4);
    setCurrentFlag(correctFlag);
    setOptions(shuffleArray([correctFlag, ...wrongOptions]));
    setShowHint(false);
  };

  const startGame = (selectedDifficulty: DifficultyLevel) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
    setScore(0);
    setAttempts(0);
    setShowHint(false);
  };

  useEffect(() => {
    if (gameStarted && difficulty) {
      generateQuestion();
    }
  }, [gameStarted, difficulty]);

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

  const showHintToast = () => {
    if (currentFlag?.hint) {
      setShowHint(true);
      toast.info(currentFlag.hint, {
        duration: 4000,
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
            Choose your difficulty level!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {(Object.keys(COUNTRIES) as DifficultyLevel[]).map((level) => (
              <Button 
                key={level}
                onClick={() => startGame(level)}
                className={`game-button text-white capitalize ${DIFFICULTY_COLORS[level]}`}
              >
                {level}
                <span className="block text-sm opacity-75">
                  ({COUNTRIES[level].length} flags)
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          onClick={() => setGameStarted(false)}
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

export default Index;
