export interface Player {
  id: string;
  name: string;
  gender: 'male' | 'female';
  truthsCompleted: number;
  daresCompleted: number;
}

export interface GameState {
  currentLevel: number;
  currentPlayerId: string | null;
  gameStarted: boolean;
  ageVerified: boolean | null; // Allow null to indicate not yet verified
  players: Player[];
  completedPrompts: Set<string>;
  gameCompleted: boolean;
}

export interface Prompt {
  id: string;
  text: string;
  type: 'truth' | 'dare';
  gender: 'male' | 'female';
  level: number;
}

export interface GameSettings {
  truthsPerLevel: number;
  daresPerLevel: number;
  maxLevel: number;
} 