# Mondoro - Modern Pomodoro & Productivity Timer

A beautiful, modern desktop Pomodoro timer built with React, Electron, Zustand, and Tailwind CSS. Track your productivity with detailed session logs and statistics.

![Mondoro Screenshot](screenshot.png)

## Features

- 🎯 **Clean, Modern UI**: Minimalist aesthetic with smooth micro-interactions and dark/light modes.
- ⏱️ **Customizable Intervals**: Configurable Pomodoro work sessions, short breaks, and long breaks.
- 📊 **Activity Logging & Analytics**: Session statistics and daily productivity trends powered by `date-fns`.
- 🔔 **Native System Notifications**: Desktop alerts using `node-notifier` and Electron notification bridges.
- 🖥️ **System Tray Minimization**: Unobtrusive background tracking with quick actions in the system tray.
- 💾 **Persistent Settings**: Instant persistence across app restarts using `electron-store`.
- 🔄 **Auto-Updates**: Seamless version checks via `electron-updater`.
- ⚡ **Developer Speed Multiplier**: Built-in speed toggles for rapid state testing.

## Tech Stack

- **Desktop Framework**: Electron
- **Frontend Core**: React 18, TypeScript, Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS, Lucide Icons
- **Storage**: `electron-store`
- **Package Manager**: Bun / npm

## Development

### Prerequisites

- Node.js 18+ or Bun (recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/picwellwisher12pk/mondoro.git
cd mondoro
```

2. Install dependencies:
```bash
bun install
```

3. Start development server:
```bash
bun run electron:dev
```

This concurrently launches the Vite dev server and spawns the Electron desktop shell.

### Building for Production

```bash
bun run electron:build
```

Distributable installers (`.exe`, `.dmg`, `.AppImage`) are generated in the `dist` folder.

## License

MIT © [Amir Hameed](https://amirhameed.com)
