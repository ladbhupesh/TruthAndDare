import React from 'react';

interface LevelUpModalProps {
  isOpen: boolean;
  onLevelUp: () => void;
  currentLevel: number;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onLevelUp,
  currentLevel,
}) => {
  if (!isOpen) return null;

  const getLevelInfo = (level: number) => {
    switch (level) {
      case 1:
        return {
          emoji: '💕',
          title: 'Flirty & Playful',
          nextTitle: 'Spicy & Teasing',
          nextEmoji: '🔥',
          color: 'from-purple-500 to-pink-500',
          bgClass: 'glass-level1',
          glowClass: 'animate-premium-glow'
        };
      case 2:
        return {
          emoji: '🔥',
          title: 'Spicy & Teasing',
          nextTitle: 'Fully Intimate & Exposing',
          nextEmoji: '💋',
          color: 'from-red-500 to-pink-500',
          bgClass: 'glass-level2',
          glowClass: 'animate-passionate-glow'
        };
      case 3:
        return {
          emoji: '💋',
          title: 'Fully Intimate & Exposing',
          nextTitle: 'Ultimate Experience',
          nextEmoji: '🏆',
          color: 'from-red-600 to-red-900',
          bgClass: 'glass-level3',
          glowClass: 'animate-intense-glow'
        };
      default:
        return {
          emoji: '🎉',
          title: 'Complete',
          nextTitle: 'New Adventure',
          nextEmoji: '🚀',
          color: 'from-purple-500 to-pink-500',
          bgClass: 'glass-premium',
          glowClass: 'animate-premium-glow'
        };
    }
  };

  const levelInfo = getLevelInfo(currentLevel);

  return (
    <div className="modal-overlay">
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

      <div className="modal-content">
        <div className={`glass-premium rounded-3xl p-12 text-center animate-scale-in ${levelInfo.glowClass}`}>
          {/* Celebration Icon */}
          <div className="mb-8">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${levelInfo.color} mb-6 ${levelInfo.glowClass}`}>
              <span className="text-6xl">{levelInfo.emoji}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-6 text-premium-gradient">
            Level {currentLevel} Complete!
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-white/90 mb-4">
            {levelInfo.title}
          </p>

          {/* Completion Message */}
          <p className="text-lg text-gray-300 mb-10">
            Both partners have conquered this level together!
          </p>

          {/* Next Level Preview */}
          <div className={`${levelInfo.bgClass} rounded-2xl p-8 mb-10`}>
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentLevel + 1 <= 3 ? 
                currentLevel === 1 ? 'from-red-500 to-pink-500' : 'from-red-600 to-red-900'
                : 'from-purple-500 to-pink-500'} flex items-center justify-center`}>
                <span className="text-2xl">{levelInfo.nextEmoji}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">
              {currentLevel + 1 <= 3 ? `Level ${currentLevel + 1}` : 'Experience Complete'}
            </h3>
            
            <p className="text-lg text-white/80 mb-4">
              {levelInfo.nextTitle}
            </p>
            
            <p className="text-gray-300">
              {currentLevel + 1 <= 3 
                ? currentLevel === 1 
                  ? "🔥 Ready for more passionate challenges?"
                  : "💋 Prepare for the most intimate experience..."
                : "🏆 You've completed the ultimate journey together!"
              }
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onLevelUp}
            className={`w-full btn-premium ${
              currentLevel + 1 <= 3 
                ? currentLevel === 1 ? 'btn-level2-premium' : 'btn-level3-premium'
                : 'btn-level1-premium'
            } py-6 px-12 text-xl font-bold rounded-2xl hover:scale-110 transition-all animate-gentle-float`}
          >
            <span className="flex items-center justify-center space-x-3">
              <span>{currentLevel + 1 <= 3 ? '🚀' : '🎉'}</span>
              <span>
                {currentLevel + 1 <= 3 
                  ? `Continue to Level ${currentLevel + 1}`
                  : 'Celebrate Completion'
                }
              </span>
              <span>{currentLevel + 1 <= 3 ? '🚀' : '🎉'}</span>
            </span>
          </button>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400">
              {currentLevel + 1 <= 3 
                ? "Your connection deepens with every level..."
                : "What an incredible journey you've shared together 💕"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 