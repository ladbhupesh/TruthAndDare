import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';

export const Settings: React.FC = () => {
  const { resetGame, players, currentLevel } = useGameStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetGame = () => {
    resetGame();
    setShowResetConfirm(false);
  };

  if (players.length === 0) return null;

  return (
    <>
      {/* Settings Button */}
      <div className="fixed top-8 right-8 z-40">
        <button
          onClick={() => setShowResetConfirm(true)}
          className="glass-premium rounded-2xl px-6 py-3 text-white font-semibold shadow-2xl transition-all hover:scale-105 animate-gentle-float flex items-center space-x-3"
        >
          <span className="text-xl">⚙️</span>
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay">
          <div className="modal-content max-w-md">
            <div className="glass-premium rounded-3xl p-10 text-center animate-scale-in">
              {/* Warning Icon */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 animate-passionate-glow mb-6">
                  <span className="text-3xl">⚠️</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold mb-6 text-premium-gradient">
                Reset Game?
              </h2>

              {/* Current Game Info */}
              <div className="glass-level2 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Current Progress</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Level:</strong> {currentLevel}</p>
                  <p><strong>Players:</strong> {players.map(p => p.name).join(' & ')}</p>
                  <p><strong>Total Completed:</strong> {players.reduce((total, p) => total + p.truthsCompleted + p.daresCompleted, 0)} challenges</p>
                </div>
              </div>

              {/* Warning Message */}
              <p className="text-lg text-gray-300 mb-8">
                This will permanently delete all progress and start over from the beginning.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleResetGame}
                  className="flex-1 btn-premium bg-gradient-to-r from-red-500 to-red-700 py-4 px-6 text-lg font-bold rounded-2xl hover:scale-105 transition-all"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>🔄</span>
                    <span>Reset Game</span>
                  </span>
                </button>
                
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 bg-gray-600/80 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-2xl transition-all hover:scale-105"
                >
                  Cancel
                </button>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  This action cannot be undone
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 