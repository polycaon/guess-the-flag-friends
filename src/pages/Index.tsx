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
    { name: "China", code: "cn", hint: "Home of the Great Wall" },
    { name: "Russia", code: "ru", hint: "Largest country in the world" },
    { name: "India", code: "in", hint: "Land of the Taj Mahal" },
    { name: "Germany", code: "de", hint: "Known for Oktoberfest" },
    { name: "Italy", code: "it", hint: "Famous for pizza and pasta" },
    { name: "Spain", code: "es", hint: "Known for flamenco dance" },
    { name: "Mexico", code: "mx", hint: "Known for tacos and pyramids" },
    { name: "South Korea", code: "kr", hint: "Land of K-pop" },
  ],
  moderate: [
    { name: "Argentina", code: "ar", hint: "Land of tango" },
    { name: "South Africa", code: "za", hint: "Rainbow Nation" },
    { name: "Egypt", code: "eg", hint: "Land of the pyramids" },
    { name: "Thailand", code: "th", hint: "Land of Smiles" },
    { name: "Turkey", code: "tr", hint: "Where Europe meets Asia" },
    { name: "Greece", code: "gr", hint: "Birthplace of democracy" },
    { name: "Sweden", code: "se", hint: "Land of the midnight sun" },
    { name: "Poland", code: "pl", hint: "Known for pierogi" },
    { name: "Netherlands", code: "nl", hint: "Land of tulips" },
    { name: "Switzerland", code: "ch", hint: "Known for chocolate and Alps" },
    { name: "Belgium", code: "be", hint: "Famous for waffles" },
    { name: "Austria", code: "at", hint: "Home of Mozart" },
    { name: "Ireland", code: "ie", hint: "Emerald Isle" },
    { name: "New Zealand", code: "nz", hint: "Land of the Kiwis" },
    { name: "Portugal", code: "pt", hint: "Famous for port wine" }
  ],
  difficult: [
    { name: "Vietnam", code: "vn", hint: "Famous for Ha Long Bay" },
    { name: "Malaysia", code: "my", hint: "Home of the Petronas Towers" },
    { name: "Ukraine", code: "ua", hint: "Known for its wheat fields" },
    { name: "Croatia", code: "hr", hint: "Land of a thousand islands" },
    { name: "Morocco", code: "ma", hint: "Known for its bazaars" },
    { name: "Finland", code: "fi", hint: "Land of the Northern Lights" },
    { name: "Denmark", code: "dk", hint: "Home of LEGO" },
    { name: "Czech Republic", code: "cz", hint: "Known for its castles" },
    { name: "Romania", code: "ro", hint: "Home of Dracula's castle" },
    { name: "Hungary", code: "hu", hint: "Known for goulash" },
    { name: "Norway", code: "no", hint: "Land of the fjords" },
    { name: "Singapore", code: "sg", hint: "Garden City" },
    { name: "Chile", code: "cl", hint: "Land of the Andes" },
    { name: "Colombia", code: "co", hint: "Known for coffee" },
    { name: "Philippines", code: "ph", hint: "Pearl of the Orient" }
  ],
  hard: [
    { name: "Kazakhstan", code: "kz", hint: "Largest landlocked country" },
    { name: "Uruguay", code: "uy", hint: "Known for mate tea" },
    { name: "Slovenia", code: "si", hint: "Land of caves" },
    { name: "Slovakia", code: "sk", hint: "Heart of Europe" },
    { name: "Estonia", code: "ee", hint: "Digital society pioneer" },
    { name: "Latvia", code: "lv", hint: "Known for Art Nouveau" },
    { name: "Lithuania", code: "lt", hint: "Land of basketball" },
    { name: "Belarus", code: "by", hint: "Land of lakes" },
    { name: "Azerbaijan", code: "az", hint: "Land of Fire" },
    { name: "Georgia", code: "ge", hint: "Land of wine origin" },
    { name: "Armenia", code: "am", hint: "Land of churches" },
    { name: "Moldova", code: "md", hint: "Known for wine cellars" },
    { name: "Montenegro", code: "me", hint: "Black Mountain" },
    { name: "North Macedonia", code: "mk", hint: "Land of lakes" },
    { name: "Albania", code: "al", hint: "Land of eagles" }
  ],
  impossible: [
    { name: "Kiribati", code: "ki", hint: "Pacific island nation" },
    { name: "Tuvalu", code: "tv", hint: "Smallest UN member state" },
    { name: "Vanuatu", code: "vu", hint: "South Pacific archipelago" },
    { name: "Palau", code: "pw", hint: "Known for jellyfish lake" },
    { name: "Nauru", code: "nr", hint: "Smallest island nation" },
    { name: "Marshall Islands", code: "mh", hint: "Made of coral atolls" },
    { name: "Micronesia", code: "fm", hint: "Scattered island nation" },
    { name: "Saint Lucia", code: "lc", hint: "The Helen of the West Indies" },
    { name: "Saint Vincent", code: "vc", hint: "Land of the Grenadines" },
    { name: "Grenada", code: "gd", hint: "Island of Spice" },
    { name: "Antigua and Barbuda", code: "ag", hint: "Land of 365 beaches" },
    { name: "Dominica", code: "dm", hint: "Nature Isle" },
    { name: "Saint Kitts and Nevis", code: "kn", hint: "Mother Colony" },
    { name: "Samoa", code: "ws", hint: "Treasured islands" },
    { name: "Tonga", code: "to", hint: "Friendly Islands" }
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
