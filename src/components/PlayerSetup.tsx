import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import type { Player } from '../types/game';

export const PlayerSetup: React.FC = () => {
  const { addPlayer, startGame, players } = useGameStore();
  const [player1, setPlayer1] = useState({ name: '', gender: 'male' as 'male' | 'female' });
  const [player2, setPlayer2] = useState({ name: '', gender: 'female' as 'male' | 'female' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!player1.name.trim() || !player2.name.trim()) {
      alert('Please enter names for both partners');
      return;
    }

    // Create player objects
    const player1Obj: Player = {
      id: 'player1',
      name: player1.name.trim(),
      gender: player1.gender,
      truthsCompleted: 0,
      daresCompleted: 0,
    };

    const player2Obj: Player = {
      id: 'player2',
      name: player2.name.trim(),
      gender: player2.gender,
      truthsCompleted: 0,
      daresCompleted: 0,
    };

    // Add players to store
    addPlayer(player1Obj);
    addPlayer(player2Obj);
    
    // Start the game
    startGame();
  };

  if (players.length >= 2) return null;

  return (
    <div className="app-container bg-premium-dark flex items-center justify-center">
      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="glass-premium rounded-3xl p-12 animate-fade-up">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-premium-glow mb-8">
              <span className="text-3xl">💕</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-premium-gradient">
              Begin Your Journey
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Set up your intimate experience
            </p>
            <p className="text-gray-400">
              Enter both partners' information to start your adventure
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Player 1 */}
            <div className="glass-level1 rounded-2xl p-8 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold text-premium">First Partner</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your partner's name"
                    value={player1.name}
                    onChange={(e) => setPlayer1({ ...player1, name: e.target.value })}
                    className="w-full input-premium"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-4">
                    Gender
                  </label>
                  <div className="flex space-x-8">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="player1Gender"
                        value="male"
                        checked={player1.gender === 'male'}
                        onChange={(e) => setPlayer1({ ...player1, gender: e.target.value as 'male' | 'female' })}
                        className="radio-premium mr-3"
                      />
                      <span className="text-lg text-gray-300 group-hover:text-white transition-colors">
                        👨 Male
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="player1Gender"
                        value="female"
                        checked={player1.gender === 'female'}
                        onChange={(e) => setPlayer1({ ...player1, gender: e.target.value as 'male' | 'female' })}
                        className="radio-premium mr-3"
                      />
                      <span className="text-lg text-gray-300 group-hover:text-white transition-colors">
                        👩 Female
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Player 2 */}
            <div className="glass-level1 rounded-2xl p-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-premium">Second Partner</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your partner's name"
                    value={player2.name}
                    onChange={(e) => setPlayer2({ ...player2, name: e.target.value })}
                    className="w-full input-premium"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-4">
                    Gender
                  </label>
                  <div className="flex space-x-8">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="player2Gender"
                        value="male"
                        checked={player2.gender === 'male'}
                        onChange={(e) => setPlayer2({ ...player2, gender: e.target.value as 'male' | 'female' })}
                        className="radio-premium mr-3"
                      />
                      <span className="text-lg text-gray-300 group-hover:text-white transition-colors">
                        👨 Male
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="player2Gender"
                        value="female"
                        checked={player2.gender === 'female'}
                        onChange={(e) => setPlayer2({ ...player2, gender: e.target.value as 'male' | 'female' })}
                        className="radio-premium mr-3"
                      />
                      <span className="text-lg text-gray-300 group-hover:text-white transition-colors">
                        👩 Female
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="btn-premium btn-level1-premium py-5 px-12 text-xl font-bold rounded-2xl animate-gentle-float"
                style={{ animationDelay: '0.3s' }}
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>✨</span>
                  <span>Start Your Journey</span>
                  <span>✨</span>
                </span>
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-gray-500">
              Your information is private and secure. Ready for an unforgettable experience?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 