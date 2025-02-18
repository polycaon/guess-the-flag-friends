
import { Button } from "@/components/ui/button";
import { COUNTRIES } from "@/data/countries";
import { DifficultyLevel, DIFFICULTY_COLORS } from "@/types/game";

interface DifficultySelectionProps {
  onDifficultySelect: (difficulty: DifficultyLevel) => void;
}

export const DifficultySelection = ({ onDifficultySelect }: DifficultySelectionProps) => {
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
              onClick={() => onDifficultySelect(level)}
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
};
