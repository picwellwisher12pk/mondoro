import React from 'react';
import { Circle } from 'lucide-react';

interface PomodoroTimerProps {
  timeLeft: number;
  mode: 'work' | 'break';
  isRunning: boolean;
  duration: number; // Duration in seconds
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  timeLeft,
  mode,
  isRunning,
  duration
}) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const circumference = 301.59; // 2 * π * r (48% of 100)
  const progress = timeLeft / duration;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative">
      <div className="w-64 h-64 mx-auto relative">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            className="stroke-current text-white/10"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            className={`stroke-current ${mode === 'work' ? 'text-indigo-400' : 'text-emerald-400'
              } transition-all duration-1000`}
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-5xl font-bold text-white">
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </div>
          {isRunning && (
            <Circle className="w-2 h-2 mx-auto mt-2 animate-pulse text-white/80" />
          )}
        </div>
      </div>
    </div>
  );
};