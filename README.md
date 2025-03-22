# Mondoro - Modern Pomodoro Timer

A beautiful, modern Pomodoro timer built with React, Electron, and Tailwind CSS. Track your productivity with detailed logs and statistics.

![Mondoro Screenshot](screenshot.png)

## Features

- 🎯 Clean, modern UI with smooth animations
- ⏱️ Customizable work and break durations
- 📊 Activity logging and statistics
- 🔔 Desktop notifications
- 🖥️ System tray integration
- 🔄 Auto-updates
- 🌙 Dark mode
- 📱 Responsive design
- ⚡ Fast development mode with speed multiplier

## Development

### Prerequisites

- Node.js 18 or later
- npm or bun (recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mondoro.git
cd mondoro
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Start the development server:

```bash
npm run electron:dev
# or
bun run electron:dev
```

This will start both the Vite development server and the Electron app.

### Development Features

- Hot reload enabled
- Speed multiplier for faster testing (development only)
- DevTools automatically opens in development mode

### Building for Production

1. Build the app:

```bash
npm run electron:build
# or
bun run electron:build
```

2. The packaged app will be available in the `dist-electron` directory.

## Usage

### Basic Timer

1. Click the play button to start a work session
2. When the work session ends, a break session starts automatically
3. Click pause to pause the timer
4. Click reset to reset the current session

### Settings

1. Click the settings icon to open settings
2. Adjust work and break durations
3. In development mode, you can also set a speed multiplier for faster testing

### Activity Log

1. Click the history icon to open the activity log
2. View your productivity statistics
3. See detailed logs of all your sessions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
