import { useGameStore } from './store/gameStore';
import { AgeVerificationModal } from './components/AgeVerificationModal';
import { PlayerSetup } from './components/PlayerSetup';
import { Game } from './components/Game';
import { Settings } from './components/Settings';

function App() {
  const { ageVerified, gameStarted } = useGameStore();

  // Show age verification if not verified
  if (ageVerified === null) {
    return <AgeVerificationModal isOpen={true} />;
  }

  // Show access denied if age verification failed
  if (ageVerified === false) {
    return (
      <div 
        className="app-container flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #000000 100%)'
        }}
      >
        <div 
          className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-center animate-scale-in"
          style={{
            borderRadius: '16px',
            padding: '3rem 2.5rem',
            maxWidth: '28rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="text-6xl mb-6">🚫</div>
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#F87171' }}>
            Access Restricted
          </h1>
          <p className="text-gray-300 mb-6" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            This intimate experience is exclusively for adults 18 and older. Please return when you meet the age requirement.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-semibold py-3 px-8 rounded-full transition-all hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show player setup if game hasn't started
  if (!gameStarted) {
    return <PlayerSetup />;
  }

  // Show main game
  return (
    <div className="App">
      <Settings />
      <Game />
    </div>
  );
}

export default App;
