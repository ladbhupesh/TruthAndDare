import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import type { Prompt } from '../types/game';
import { LevelUpModal } from './LevelUpModal';

export const Game: React.FC = () => {
  const {
    players,
    currentPlayerId,
    setCurrentPlayer,
    updatePlayer,
    completePrompt,
    nextLevel,
    currentLevel,
    canChooseType,
    getRandomPrompt,
    restoreGameState,
  } = useGameStore();

  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showGameComplete, setShowGameComplete] = useState(false);

  // Restore game state on component mount
  useEffect(() => {
    if (players.length === 2) {
      restoreGameState();
    }
  }, [players.length, restoreGameState]);

  // Set initial player if none is set
  useEffect(() => {
    if (!currentPlayerId && players.length === 2) {
      setCurrentPlayer(players[0].id);
    }
  }, [currentPlayerId, players, setCurrentPlayer]);

  // Auto-advance to next player if current player has completed all prompts
  useEffect(() => {
    if (currentPlayerId && players.length === 2) {
      const currentPlayer = players.find(p => p.id === currentPlayerId);
      if (currentPlayer && currentPlayer.truthsCompleted >= 5 && currentPlayer.daresCompleted >= 5) {
        const currentIndex = players.findIndex(p => p.id === currentPlayerId);
        const nextIndex = (currentIndex + 1) % players.length;
        const nextPlayer = players[nextIndex];
        
        if (nextPlayer.truthsCompleted >= 5 && nextPlayer.daresCompleted >= 5) {
          console.log('🎉 Both players completed, level should be complete!');
        } else {
          setCurrentPlayer(nextPlayer.id);
          console.log(`🔄 Auto-advanced to ${nextPlayer.name}`);
        }
      }
    }
  }, [currentPlayerId, players, setCurrentPlayer]);

  // Check if level is complete
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentLevelPlayers = players.filter(p => p.truthsCompleted >= 5 && p.daresCompleted >= 5);
      const levelComplete = currentLevelPlayers.length === players.length;
      
      if (levelComplete) {
        if (currentLevel >= 3) {
          setShowGameComplete(true);
        } else {
          setShowLevelUp(true);
        }
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [players, currentLevel]);

  const handleChooseType = async (type: 'truth' | 'dare') => {
    if (!currentPlayerId) return;

    const currentPlayer = players.find(p => p.id === currentPlayerId);
    if (!currentPlayer) return;

    const prompt = await getRandomPrompt(type, currentPlayer.gender, currentLevel);
    if (!prompt) {
      alert('No more prompts available for this type. Please choose the other option.');
      return;
    }

    setCurrentPrompt(prompt);
  };

  const handleCompletePrompt = () => {
    if (!currentPrompt || !currentPlayerId) return;

    completePrompt(currentPrompt.id);

    const currentPlayer = players.find(p => p.id === currentPlayerId);
    if (currentPlayer) {
      const updates = currentPrompt.type === 'truth' 
        ? { truthsCompleted: currentPlayer.truthsCompleted + 1 }
        : { daresCompleted: currentPlayer.daresCompleted + 1 };
      
      updatePlayer(currentPlayerId, updates);
    }

    setCurrentPrompt(null);

    const currentIndex = players.findIndex(p => p.id === currentPlayerId);
    const nextIndex = (currentIndex + 1) % players.length;
    setCurrentPlayer(players[nextIndex].id);
  };



  const handleLevelUp = () => {
    setShowLevelUp(false);
    nextLevel();
    players.forEach(player => {
      updatePlayer(player.id, { truthsCompleted: 0, daresCompleted: 0 });
    });
    setCurrentPlayer(players[0].id);
  };

  if (players.length < 2) return null;

  const currentPlayer = players.find(p => p.id === currentPlayerId);

  return (
    <div 
      className="app-container relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="relative z-10 max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-lg">🔥</span>
            </div>
            <h1 className="text-2xl font-bold text-white">SECRETS</h1>
          </div>
          
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`w-2 h-2 rounded-full ${
                  currentLevel >= level ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

                 {/* Current Prompt Display */}
         {currentPrompt && (
           <div className="mb-8">
             <div 
               className="rounded-3xl p-6 text-center text-white font-bold relative overflow-hidden shadow-2xl"
               style={{ 
                 minHeight: '320px',
                 background: currentPrompt.type === 'truth' 
                   ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)'
                   : 'linear-gradient(135deg, #ec4899 0%, #e11d48 50%, #dc2626 100%)',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'space-between'
               }}
             >
               {/* Player Name Header */}
               <div className="pt-4">
                 <span className="text-xl font-black tracking-wider drop-shadow-lg">
                   {currentPlayer?.name.toUpperCase()}
                 </span>
               </div>
               
               {/* Prompt Text */}
               <div className="flex-1 flex items-center justify-center px-6 py-8">
                 <p className="text-lg font-bold leading-tight text-center drop-shadow-lg">
                   {currentPrompt.text.toUpperCase()}
                 </p>
               </div>

               {/* Watermark */}
               <div className="pb-4">
                 <span className={`text-8xl font-black opacity-10 ${
                   currentPrompt.type === 'truth' ? 'text-green-800' : 'text-red-800'
                 }`} style={{ lineHeight: '1' }}>
                   {currentPrompt.type === 'truth' ? 'TRUTH' : 'DARE'}
                 </span>
               </div>

               {/* Subtle overlay for better text readability */}
               <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 rounded-3xl"></div>
             </div>

                         {/* Action Buttons */}
             <div className="mt-6">
               <button
                 onClick={handleCompletePrompt}
                 className="w-full btn-action bg-gradient-to-br from-green-500 to-green-700 text-white font-black py-6 px-6 rounded-2xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/40 active:scale-95"
                 style={{ 
                   fontSize: '16px'
                 }}
               >
                 COMPLETED
               </button>
             </div>
          </div>
        )}

                 {/* Choice Buttons */}
         {!currentPrompt && (
           <div className="space-y-4 mb-8">
             <button
               onClick={() => handleChooseType('truth')}
               disabled={!canChooseType(currentPlayerId!, 'truth')}
               className={`w-full rounded-3xl text-center text-white font-bold transition-all duration-300 ${
                 canChooseType(currentPlayerId!, 'truth')
                   ? 'btn-truth hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/40 active:scale-[0.98]'
                   : 'bg-gray-600 opacity-40 cursor-not-allowed'
               }`}
               style={{ 
                 minHeight: '140px'
               }}
               aria-label="Choose Truth challenge"
             >
               <div className="flex flex-col items-center justify-center h-full py-8 relative z-10">
                 <div className="text-5xl mb-4 filter drop-shadow-lg">💬</div>
                 <span className="text-3xl font-black tracking-wider drop-shadow-lg">TRUTH</span>
                 <span className="text-sm mt-2 opacity-90 font-medium">Share a secret</span>
               </div>
             </button>

             <button
               onClick={() => handleChooseType('dare')}
               disabled={!canChooseType(currentPlayerId!, 'dare')}
               className={`w-full rounded-3xl text-center text-white font-bold transition-all duration-300 ${
                 canChooseType(currentPlayerId!, 'dare')
                   ? 'btn-dare hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/40 active:scale-[0.98]'
                   : 'bg-gray-600 opacity-40 cursor-not-allowed'
               }`}
               style={{ 
                 minHeight: '140px'
               }}
               aria-label="Choose Dare challenge"
             >
               <div className="flex flex-col items-center justify-center h-full py-8 relative z-10">
                 <div className="text-5xl mb-4 filter drop-shadow-lg">🎯</div>
                 <span className="text-3xl font-black tracking-wider drop-shadow-lg">DARE</span>
                 <span className="text-sm mt-2 opacity-90 font-medium">Take a challenge</span>
               </div>
             </button>
           </div>
         )}

        {/* Level Progress */}
        <div className="bg-gray-800/50 rounded-2xl p-6 text-center">
          <p className="text-white font-medium mb-3">
            Level Progress: {players.reduce((total, p) => total + p.truthsCompleted + p.daresCompleted, 0)}/20
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-pink-500 h-2 rounded-full transition-all duration-1000"
              style={{ 
                width: `${(players.reduce((total, p) => total + p.truthsCompleted + p.daresCompleted, 0) / 20) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Player Stats - Compact */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {players.map((player) => (
            <div
              key={player.id}
              className={`bg-gray-800/50 rounded-xl p-4 text-center ${
                player.id === currentPlayerId ? 'ring-2 ring-white/30' : ''
              }`}
            >
              <h3 className="text-white font-bold mb-2">
                {player.name} {player.id === currentPlayerId && '👑'}
              </h3>
              <div className="text-xs text-gray-300 space-y-1">
                <div>💭 {player.truthsCompleted}/5</div>
                <div>🎯 {player.daresCompleted}/5</div>
                <div className="font-medium">Total: {player.truthsCompleted + player.daresCompleted}/10</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Up Modal */}
      <LevelUpModal
        isOpen={showLevelUp}
        onLevelUp={handleLevelUp}
        currentLevel={currentLevel}
      />

      {/* Game Complete Modal */}
      {showGameComplete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="glass-premium rounded-3xl p-12 text-center animate-scale-in">
              <div className="text-8xl mb-8 animate-intense-glow">🏆</div>
              
              <h2 className="text-4xl font-bold mb-6 text-premium-gradient">
                Journey Complete!
              </h2>
              
              <p className="text-xl text-white/90 mb-4">
                You've conquered all three levels together
              </p>
              
              <p className="text-lg text-gray-300 mb-8">
                From flirty beginnings to intimate depths - what an incredible adventure!
              </p>

              <div className="glass-level3 p-6 rounded-2xl mb-8">
                <p className="text-lg text-white font-semibold mb-2">
                  Total Challenges Completed: {players.reduce((total, p) => total + p.truthsCompleted + p.daresCompleted, 0)}
                </p>
                <p className="text-gray-300">
                  Your bond has grown stronger through every challenge 💕
                </p>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="btn-premium btn-level3-premium py-5 px-12 text-xl font-bold rounded-2xl hover:scale-110 transition-all"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>🔄</span>
                  <span>Start New Journey</span>
                  <span>🔄</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 