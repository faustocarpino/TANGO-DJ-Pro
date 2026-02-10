
import React from 'react';
import { Track, DeckState } from "./types";

interface DeckProps {
  id: 'A' | 'B';
  state: DeckState;
  onUpdate: (newState: Partial<DeckState>) => void;
}

export const Deck: React.FC<DeckProps> = ({ id, state, onUpdate }) => {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex-1 flex flex-col p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm ${id === 'A' ? 'mr-1' : 'ml-1'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4 items-center">
          <div className="w-20 h-20 rounded-lg overflow-hidden shadow-lg border border-zinc-700 bg-zinc-800">
            {state.track ? (
              <img src={state.track.coverUrl} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600">
                <i className="fa-solid fa-compact-disc fa-2xl animate-spin-slow" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white truncate max-w-[200px]">
              {state.track?.title || "No Track Loaded"}
            </h2>
            <p className="text-sm text-zinc-400 truncate">
              {state.track?.artist || "Load from library"}
            </p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 bg-zinc-800 text-blue-400 text-xs font-bold rounded border border-zinc-700">
                {state.track?.bpm || "---"} BPM
              </span>
              {state.track?.source && (
                <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded border border-zinc-700 flex items-center gap-1">
                  <i className={`fa-brands fa-${state.track.source === 'spotify' ? 'spotify' : state.track.source === 'apple' ? 'apple' : 'hard-drive'}`} />
                  {state.track.source}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-mono font-bold text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
            {formatTime(state.currentTime)}
          </div>
          <div className="text-xs text-zinc-500 font-mono">
            -{formatTime((state.track?.duration || 0) - state.currentTime)}
          </div>
        </div>
      </div>

      {/* Waveform Mock */}
      <div className="relative h-24 bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden mb-4 group">
        <div className="absolute inset-0 flex items-center justify-around px-2 pointer-events-none opacity-40">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={i} 
              className="w-1 bg-blue-500 rounded-full" 
              style={{ height: `${Math.random() * 80 + 10}%` }}
            />
          ))}
        </div>
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white z-10 shadow-[0_0_10px_white]"
          style={{ left: `${(state.currentTime / (state.track?.duration || 1)) * 100}%` }}
        />
        <input 
          type="range"
          min="0"
          max={state.track?.duration || 100}
          value={state.currentTime}
          onChange={(e) => onUpdate({ currentTime: Number(e.target.value) })}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between gap-4 mt-auto">
        <div className="flex gap-2">
          <button 
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${state.isPlaying ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.5)]'}`}
            onClick={() => onUpdate({ isPlaying: !state.isPlaying })}
          >
            <i className={`fa-solid ${state.isPlaying ? 'fa-pause' : 'fa-play'} fa-xl`} />
          </button>
          <button className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center hover:bg-zinc-700">
            <i className="fa-solid fa-rotate-left" />
          </button>
        </div>

        <div className="flex flex-col gap-1 flex-1 px-4">
          <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-bold">
            <span>Tempo</span>
            <span>{((state.pitch - 1) * 100).toFixed(1)}%</span>
          </div>
          <input 
            type="range"
            min="0.9"
            max="1.1"
            step="0.001"
            value={state.pitch}
            onChange={(e) => onUpdate({ pitch: Number(e.target.value) })}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex flex-col items-center">
          <button className="text-zinc-500 hover:text-blue-400 mb-1">
            <i className="fa-solid fa-lock" />
          </button>
          <div className="bg-zinc-800 px-2 py-1 rounded text-[10px] font-mono text-zinc-400">
            KEY
          </div>
        </div>
      </div>
    </div>
  );
};
