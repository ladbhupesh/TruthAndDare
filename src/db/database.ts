import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { Player, Prompt } from '../types/game';

export class GameDatabase extends Dexie {
  players!: Table<Player>;
  prompts!: Table<Prompt>;
  gameState!: Table<{ key: string; value: any }>;

  constructor() {
    super('CoupleTruthDareDB');
    this.version(1).stores({
      players: 'id, name, gender',
      prompts: 'id, type, gender, level',
      gameState: 'key'
    });
  }

  async saveGameState(key: string, value: any): Promise<void> {
    await this.gameState.put({ key, value });
  }

  async getGameState(key: string): Promise<any> {
    const result = await this.gameState.get(key);
    return result?.value;
  }

  async clearAllData(): Promise<void> {
    await this.players.clear();
    await this.prompts.clear();
    await this.gameState.clear();
  }
}

export const db = new GameDatabase(); 