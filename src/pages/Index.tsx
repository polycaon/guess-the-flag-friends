
import { useState } from 'react';
import { DifficultySelection } from "@/components/game/DifficultySelection";
import { FlagGame } from "@/components/game/FlagGame";
import { DifficultyLevel } from "@/types/game";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel | null>(null);

  const handleDifficultySelect = (selectedDifficulty: DifficultyLevel) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return <DifficultySelection onDifficultySelect={handleDifficultySelect} />;
  }

  return (
    <FlagGame 
      difficulty={difficulty as DifficultyLevel} 
      onBack={() => setGameStarted(false)} 
    />
  );
};

export default Index;
