import React from 'react';
import { X, Clock, Activity, CheckCircle2, XCircle } from 'lucide-react';
import { useLogStore } from '../store/logStore';
import { formatDistanceToNow } from 'date-fns';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { logs, stats } = useLogStore();

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    return (
        <div
            className={`fixed inset-y-0 right-0 w-80 bg-white/10 backdrop-blur-lg shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="h-full flex flex-col">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">Activity Log</h2>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-4 border-b border-white/10">
                    <h3 className="text-lg font-medium text-white mb-4">Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-white/60">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">Total Work Time</span>
                            </div>
                            <div className="text-white font-medium mt-1">
                                {formatDuration(stats.totalWorkTime)}
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-white/60">
                                <Activity className="w-4 h-4" />
                                <span className="text-sm">Total Break Time</span>
                            </div>
                            <div className="text-white font-medium mt-1">
                                {formatDuration(stats.totalBreakTime)}
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-white/60">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-sm">Completed Sessions</span>
                            </div>
                            <div className="text-white font-medium mt-1">
                                {stats.completedSessions}
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-white/60">
                                <XCircle className="w-4 h-4" />
                                <span className="text-sm">Interrupted Sessions</span>
                            </div>
                            <div className="text-white font-medium mt-1">
                                {stats.interruptedSessions}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                        {logs.map((log) => (
                            <div
                                key={log.id}
                                className="bg-white/5 rounded-lg p-3 flex items-center justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`w-2 h-2 rounded-full ${log.mode === 'work'
                                                    ? 'bg-indigo-400'
                                                    : 'bg-emerald-400'
                                                }`}
                                        />
                                        <span className="text-white font-medium">
                                            {log.mode === 'work' ? 'Work' : 'Break'}
                                        </span>
                                    </div>
                                    <div className="text-white/60 text-sm mt-1">
                                        {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                                    </div>
                                </div>
                                <div className="text-white/80">
                                    {Math.floor(log.duration / 60)}m
                                </div>
                            </div>
                        ))}
                        {logs.length === 0 && (
                            <div className="text-white/40 text-center py-8">
                                No activity logs yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};