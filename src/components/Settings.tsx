import React from 'react';
import { X, Save } from 'lucide-react';

interface SettingsProps {
  settings: {
    workDuration: number;
    breakDuration: number;
    speedMultiplier?: number;
  };
  onSave: (settings: {
    workDuration: number;
    breakDuration: number;
    speedMultiplier?: number;
  }) => void;
  onCancel: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  settings,
  onSave,
  onCancel,
}) => {
  const [localSettings, setLocalSettings] = React.useState(settings);
  const isDev = import.meta.env.DEV;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Work Duration (minutes)
        </label>
        <input
          type="number"
          min="1"
          max="60"
          value={localSettings.workDuration}
          onChange={(e) =>
            setLocalSettings({
              ...localSettings,
              workDuration: parseInt(e.target.value),
            })
          }
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Break Duration (minutes)
        </label>
        <input
          type="number"
          min="1"
          max="30"
          value={localSettings.breakDuration}
          onChange={(e) =>
            setLocalSettings({
              ...localSettings,
              breakDuration: parseInt(e.target.value),
            })
          }
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {isDev && (
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Speed Multiplier (Development Only)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={localSettings.speedMultiplier || 1}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                speedMultiplier: parseInt(e.target.value),
              })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <p className="text-white/60 text-sm mt-1">
            Warning: This will speed up the timer for development purposes only
          </p>
        </div>
      )}

      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <button
          onClick={() => onSave(localSettings)}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          <Save className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};