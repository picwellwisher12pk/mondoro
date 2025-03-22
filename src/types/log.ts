export interface LogEntry {
  id: string;
  timestamp: number;
  duration: number; // in seconds
  mode: 'work' | 'break';
  completed: boolean; // whether the session was completed or interrupted
}

export interface LogStats {
  totalWorkTime: number; // in seconds
  totalBreakTime: number; // in seconds
  completedSessions: number;
  interruptedSessions: number;
}
