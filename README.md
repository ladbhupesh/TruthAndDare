# 💕 Couple's Truth & Dare Game

A romantic and intimate truth & dare game designed for couples to explore their relationship through fun challenges and deep conversations.

## 🚀 Features

### 🔞 Age Verification
- **18+ Only**: Age verification modal on first load
- **Persistent**: Remembers your verification choice
- **Secure**: Blocks access for underage users

### 👫 Player Setup
- **Two Players**: Enter names and genders for both partners
- **Gender-Specific**: Prompts tailored to each player's gender
- **Persistent Storage**: Saves player information locally

### 🎮 Gameplay
- **Three Levels**: Progressive intensity from flirty to intimate
- **Balanced Challenges**: 5 Truths + 5 Dares per level per player
- **Smart Selection**: Prevents prompt repetition within levels
- **Turn-Based**: Alternating players for fair gameplay

### 📊 Progress Tracking
- **Visual Progress Bars**: See completion status for both players
- **Level Progression**: Automatic advancement when level is complete
- **Persistent Progress**: Game state saved locally

### ⚙️ Settings & Reset
- **Reset Game**: Clear all data and start fresh
- **Settings Panel**: Access game information and controls
- **Always Accessible**: Settings available throughout gameplay

## 🎯 Game Levels

### Level 1: Flirty & Playful 💕
- **30 Truths + 30 Dares** for each gender
- Light, romantic questions and fun challenges
- Perfect for new couples or first-time players

### Level 2: Spicy & Teasing 🔥
- **30 Truths + 30 Dares** for each gender
- More intimate questions and teasing challenges
- For couples ready to explore deeper connections

### Level 3: Fully Intimate & Exposing 💋
- **30 Truths + 20-30 Dares** for each gender
- Most intimate level with explicit content
- For committed couples seeking ultimate intimacy

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript + Vite
- **State Management**: Zustand with persistence
- **Storage**: IndexedDB via Dexie.js
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd couple-truth-dare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎮 How to Play

1. **Age Verification**: Confirm you're 18+ on first load
2. **Player Setup**: Enter names and genders for both partners
3. **Choose Challenge**: Select Truth or Dare on your turn
4. **Complete Challenge**: Mark as completed or skip if needed
5. **Progress**: Watch progress bars fill as you complete challenges
6. **Level Up**: Advance to next level when both players finish
7. **Continue**: Keep playing through all three levels

## 🔒 Privacy & Security

- **Local Storage**: All data stored locally on your device
- **No Internet**: Game works completely offline
- **Private**: No data sent to external servers
- **Reset Option**: Clear all data anytime with reset button

## 🎨 Customization

The game includes **180+ unique prompts** across all levels and genders. Prompts are stored in `TRUTH_AND_DARE.MD` and can be customized by editing the prompts data structure.

## 📱 PWA Ready

The game is built with PWA capabilities and can be installed on mobile devices for a native app experience.

## 🤝 Contributing

Feel free to contribute by:
- Adding new prompts
- Improving the UI/UX
- Adding new features
- Fixing bugs

## 📄 License

This project is for personal use and educational purposes.

## ⚠️ Disclaimer

This game contains mature content intended for adults 18+ in committed relationships. Please ensure all participants are comfortable with the content level before playing.

---

**Enjoy exploring your relationship with love, respect, and fun! 💕**
