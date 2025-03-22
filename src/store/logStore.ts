import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LogEntry, LogStats } from '../types/log';

interface LogStore {
  logs: LogEntry[];
  stats: LogStats;
  addLog: (entry: Omit<LogEntry, 'id'>) => void;
  updateLog: (id: string, completed: boolean) => void;
  clearLogs: () => void;
  calculateStats: () => void;
}

export const useLogStore = create<LogStore>()(
  persist(
    (set, get) => ({
      logs: [],
      stats: {
        totalWorkTime: 0,
        totalBreakTime: 0,
        completedSessions: 0,
        interruptedSessions: 0,
      },
      addLog: (entry) => {
        const newEntry: LogEntry = {
          ...entry,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          logs: [...state.logs, newEntry],
        }));
        get().calculateStats();
      },
      updateLog: (id, completed) => {
        set((state) => ({
          logs: state.logs.map((log) =>
            log.id === id ? { ...log, completed } : log
          ),
        }));
        get().calculateStats();
      },
      clearLogs: () => {
        set({ logs: [] });
        get().calculateStats();
      },
      calculateStats: () => {
        const { logs } = get();
        const stats: LogStats = {
          totalWorkTime: 0,
          totalBreakTime: 0,
          completedSessions: 0,
          interruptedSessions: 0,
        };

        logs.forEach((log) => {
          if (log.mode === 'work') {
            stats.totalWorkTime += log.duration;
          } else {
            stats.totalBreakTime += log.duration;
          }
          if (log.completed) {
            stats.completedSessions++;
          } else {
            stats.interruptedSessions++;
          }
        });

        set({ stats });
      },
    }),
    {
      name: 'pomodoro-logs',
    }
  )
);
