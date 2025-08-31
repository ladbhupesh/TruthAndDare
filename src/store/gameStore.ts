import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GameState, Player, Prompt } from '../types/game';
import { db } from '../db/database';

interface GameStore extends GameState {
  // Actions
  setAgeVerified: (verified: boolean) => void;
  addPlayer: (player: Player) => void;
  updatePlayer: (playerId: string, updates: Partial<Player>) => void;
  setCurrentPlayer: (playerId: string | null) => void;
  completePrompt: (promptId: string) => void;
  nextLevel: () => void;
  resetGame: () => void;
  startGame: () => void;
  getRandomPrompt: (type: 'truth' | 'dare', gender: 'male' | 'female', level: number) => Promise<Prompt | null>;
  canChooseType: (playerId: string, type: 'truth' | 'dare') => boolean;
  isLevelComplete: () => boolean;
  restoreGameState: () => Promise<void>;
}

const initialGameState: GameState = {
  currentLevel: 1,
  currentPlayerId: null,
  gameStarted: false,
  ageVerified: null, // Changed from false to null to indicate not yet verified
  players: [],
  completedPrompts: new Set(),
  gameCompleted: false,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialGameState,
      completedPrompts: new Set(),

      setAgeVerified: (verified: boolean) => {
        set({ ageVerified: verified });
        db.saveGameState('ageVerified', verified);
      },

      addPlayer: (player: Player) => {
        set((state) => ({
          players: [...state.players, player],
        }));
        db.players.put(player);
      },

      updatePlayer: (playerId: string, updates: Partial<Player>) => {
        set((state) => ({
          players: state.players.map((p) =>
            p.id === playerId ? { ...p, ...updates } : p
          ),
        }));
        // Update in database
        db.players.get(playerId).then((player) => {
          if (player) {
            db.players.put({ ...player, ...updates });
          }
        });
      },

      setCurrentPlayer: (playerId: string | null) => {
        set({ currentPlayerId: playerId });
        db.saveGameState('currentPlayerId', playerId);
      },

      completePrompt: (promptId: string) => {
        set((state) => ({
          completedPrompts: new Set([...state.completedPrompts, promptId]),
        }));
        db.saveGameState('completedPrompts', Array.from(get().completedPrompts));
      },

      nextLevel: () => {
        const currentLevel = get().currentLevel;
        const nextLevel = currentLevel + 1;
        console.log(`🎮 Moving from Level ${currentLevel} to Level ${nextLevel}`);
        
        if (nextLevel <= 3) {
          set({
            currentLevel: nextLevel,
            currentPlayerId: null,
          });
          db.saveGameState('currentLevel', nextLevel);
          console.log(`✅ Successfully moved to Level ${nextLevel}`);
        } else {
          // Game completed
          set({ gameCompleted: true });
          db.saveGameState('gameCompleted', true);
          console.log('🏆 Game completed!');
        }
      },

      resetGame: () => {
        set(initialGameState);
        db.clearAllData();
      },

      restoreGameState: async () => {
        try {
          // Restore current player from database
          const savedCurrentPlayer = await db.getGameState('currentPlayerId');
          if (savedCurrentPlayer) {
            set({ currentPlayerId: savedCurrentPlayer });
            console.log('🔄 Restored current player:', savedCurrentPlayer);
          }
        } catch (error) {
          console.error('Error restoring game state:', error);
        }
      },

      startGame: () => {
        set({ gameStarted: true });
        db.saveGameState('gameStarted', true);
      },

      getRandomPrompt: async (type: 'truth' | 'dare', gender: 'male' | 'female', level: number) => {
        try {
          const { getRandomPrompt: getPrompt } = await import('../data/prompts');
          const prompt = getPrompt(type, gender, level, get().completedPrompts);
          console.log(`🎯 Getting prompt for ${type} (${gender}, level ${level}):`, prompt ? 'Found' : 'Not found');
          return prompt;
        } catch (error) {
          console.error('Error getting random prompt:', error);
          return null;
        }
      },

      canChooseType: (playerId: string, type: 'truth' | 'dare') => {
        const player = get().players.find((p) => p.id === playerId);
        if (!player) return false;
        
        if (type === 'truth') {
          return player.truthsCompleted < 5;
        } else {
          return player.daresCompleted < 5;
        }
      },

      isLevelComplete: () => {
        const { players, currentLevel } = get();
        const isComplete = players.every((player) => 
          player.truthsCompleted >= 5 && player.daresCompleted >= 5
        );
        console.log(`🔍 Level ${currentLevel} completion check:`, {
          players: players.map(p => ({
            name: p.name,
            truths: p.truthsCompleted,
            dares: p.daresCompleted
          })),
          isComplete
        });
        return isComplete;
      },
    }),
    {
      name: 'couple-truth-dare-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentLevel: state.currentLevel,
        currentPlayerId: state.currentPlayerId,
        ageVerified: state.ageVerified,
        gameStarted: state.gameStarted,
        players: state.players,
        completedPrompts: Array.from(state.completedPrompts),
        gameCompleted: state.gameCompleted,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.completedPrompts = new Set(state.completedPrompts);
        }
      },
    }
  )
); 