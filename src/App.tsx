import React, { useState, useEffect, useCallback } from 'react';
import { Timer, Settings, Play, Pause, RotateCcw, History } from 'lucide-react';
import { PomodoroTimer } from './components/PomodoroTimer';
import { Settings as SettingsPanel } from './components/Settings';
import { Sidebar } from './components/Sidebar';
import { useLogStore } from './store/logStore';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [showSettings, setShowSettings] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [settings, setSettings] = useState({
    workDuration: 25,
    breakDuration: 5,
    speedMultiplier: 1,
  });
  const { addLog, updateLog } = useLogStore();

  const resetTimer = useCallback(() => {
    setTimeLeft(settings.workDuration * 60);
    setMode('work');
    setIsRunning(false);
  }, [settings.workDuration]);

  const toggleTimer = () => {
    if (!isRunning) {
      // Start a new session
      addLog({
        timestamp: Date.now(),
        duration: mode === 'work' ? settings.workDuration * 60 : settings.breakDuration * 60,
        mode,
        completed: false,
      });
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const speedMultiplier = import.meta.env.DEV ? settings.speedMultiplier : 1;
    const intervalMs = 1000 / speedMultiplier;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, intervalMs);
    } else if (timeLeft === 0) {
      // Session completed
      updateLog(Date.now().toString(), true);

      // Switch modes
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(settings.breakDuration * 60);
        new Notification('Break Time!', {
          body: 'Time to take a break!',
        });
      } else {
        setMode('work');
        setTimeLeft(settings.workDuration * 60);
        new Notification('Work Time!', {
          body: 'Break is over, back to work!',
        });
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, settings, updateLog]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl h-dvh">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Timer className="w-8 h-8" />
            Monmodoro
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSidebar(true)}
              className="text-white hover:text-indigo-200 transition-colors"
            >
              <History className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:text-indigo-200 transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {showSettings ? (
          <SettingsPanel
            settings={settings}
            onSave={(newSettings) => {
              setSettings({
                ...newSettings,
                speedMultiplier: newSettings.speedMultiplier || 1,
              });
              setShowSettings(false);
              resetTimer();
            }}
            onCancel={() => setShowSettings(false)}
          />
        ) : (
          <>
            <PomodoroTimer
              timeLeft={timeLeft}
              mode={mode}
              isRunning={isRunning}
              duration={mode === 'work' ? settings.workDuration * 60 : settings.breakDuration * 60}
            />

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={toggleTimer}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all transform hover:scale-110"
              >
                {isRunning ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={resetTimer}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all transform hover:scale-110"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm">
                {mode === 'work' ? 'Work Session' : 'Break Time'}
              </p>
            </div>
          </>
        )}
      </div>

      <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
    </div>
  );
}

export default App;