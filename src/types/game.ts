
export interface Flag {
  name: string;
  code: string;
  hint?: string;
}

export type DifficultyLevel = 'easy' | 'moderate' | 'difficult' | 'hard' | 'impossible';

export const DIFFICULTY_COLORS = {
  easy: 'bg-green-500',
  moderate: 'bg-yellow-500',
  difficult: 'bg-orange-500',
  hard: 'bg-red-500',
  impossible: 'bg-purple-500',
} as const;
