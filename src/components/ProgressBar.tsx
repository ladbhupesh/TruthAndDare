import React from 'react';

interface ProgressBarProps {
  truthsCompleted: number;
  daresCompleted: number;
  maxPerType: number;
  level?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  truthsCompleted,
  daresCompleted,
  maxPerType,
  level = 1,
}) => {
  const truthPercentage = (truthsCompleted / maxPerType) * 100;
  const darePercentage = (daresCompleted / maxPerType) * 100;

  // Level-specific styling
  const getLevelStyling = () => {
    switch (level) {
      case 1:
        return {
          truthGradient: 'from-blue-300 to-blue-500',
          dareGradient: 'from-pink-300 to-pink-500',
          totalGradient: 'from-pink-300 via-purple-400 to-pink-500',
          animation: 'animate-pulse-slow'
        };
      case 2:
        return {
          truthGradient: 'from-blue-400 to-blue-700',
          dareGradient: 'from-red-400 to-red-700',
          totalGradient: 'from-pink-400 via-purple-500 to-red-500',
          animation: 'animate-tempting-pulse'
        };
      case 3:
        return {
          truthGradient: 'from-blue-500 to-blue-900',
          dareGradient: 'from-red-500 to-red-900',
          totalGradient: 'from-red-400 via-red-600 to-red-800',
          animation: 'animate-intense-glow'
        };
      default:
        return {
          truthGradient: 'from-blue-400 to-blue-600',
          dareGradient: 'from-red-400 to-red-600',
          totalGradient: 'from-pink-400 via-purple-500 to-pink-600',
          animation: ''
        };
    }
  };

  const levelStyle = getLevelStyling();

  return (
    <div className="space-y-6">
      {/* Truth Progress */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className={`text-blue-200 font-semibold text-lg ${level >= 2 ? 'animate-seductive-float' : ''}`}>💭 Truths</span>
          <span className="text-sm text-pink-100 font-medium">
            {truthsCompleted}/{maxPerType}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-4 backdrop-blur-sm">
          <div
            className={`bg-gradient-to-r ${levelStyle.truthGradient} h-4 rounded-full transition-all duration-500 shadow-lg ${truthPercentage > 0 ? levelStyle.animation : ''}`}
            style={{ width: `${truthPercentage}%` }}
          />
        </div>
      </div>

      {/* Dare Progress */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className={`text-red-200 font-semibold text-lg ${level >= 2 ? 'animate-seductive-float' : ''}`}>🎯 Dares</span>
          <span className="text-sm text-pink-100 font-medium">
            {daresCompleted}/{maxPerType}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-4 backdrop-blur-sm">
          <div
            className={`bg-gradient-to-r ${levelStyle.dareGradient} h-4 rounded-full transition-all duration-500 shadow-lg ${darePercentage > 0 ? levelStyle.animation : ''}`}
            style={{ width: `${darePercentage}%` }}
          />
        </div>
      </div>

      {/* Total Progress */}
      <div className="pt-4 border-t border-white/20">
        <div className="flex justify-between items-center mb-3">
          <span className={`text-purple-200 font-semibold text-lg ${level >= 3 ? 'animate-steamy-breath' : level >= 2 ? 'animate-tempting-pulse' : ''}`}>
            {level === 3 ? '💋' : level === 2 ? '🔥' : '💕'} Total Progress
          </span>
          <span className="text-sm text-pink-100 font-medium">
            {truthsCompleted + daresCompleted}/{maxPerType * 2}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-4 backdrop-blur-sm">
          <div
            className={`bg-gradient-to-r ${levelStyle.totalGradient} h-4 rounded-full transition-all duration-500 shadow-lg ${((truthsCompleted + daresCompleted) > 0) ? levelStyle.animation : ''}`}
            style={{ width: `${((truthsCompleted + daresCompleted) / (maxPerType * 2)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}; 