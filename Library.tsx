
import React, { useState } from 'react';
import { Track } from '../types';
import { MOCK_TRACKS } from "./constants";

interface LibraryProps {
  onLoadToDeck: (track: Track, deck: 'A' | 'B') => void;
}

export const Library: React.FC<LibraryProps> = ({ onLoadToDeck }) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'spotify' | 'apple' | 'local'>('all');

  const filteredTracks = MOCK_TRACKS.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.artist.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'all' || t.source === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden m-4">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex flex-col gap-4">
        <div className="flex items-center gap-4">
           <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-music text-blue-500" /> Library
           </h2>
           <div className="flex-1 relative">
             <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
             <input 
               type="text"
               placeholder="Search tracks, artists, albums..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all"
             />
           </div>
        </div>
        <div className="flex gap-2">
          {['all', 'spotify', 'apple', 'local'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {tab === 'local' ? 'My Files' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
        <table className="w-full text-left text-zinc-400 text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="p-3 font-medium">#</th>
              <th className="p-3 font-medium">Track</th>
              <th className="p-3 font-medium">BPM</th>
              <th className="p-3 font-medium">Duration</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTracks.map((track, idx) => (
              <tr key={track.id} className="hover:bg-zinc-900/50 group transition-colors">
                <td className="p-3 w-8">{idx + 1}</td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={track.coverUrl} className="w-10 h-10 rounded shadow-sm" alt="" />
                    <div>
                      <div className="text-white font-medium">{track.title}</div>
                      <div className="text-xs">{track.artist}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 font-mono">{track.bpm}</td>
                <td className="p-3 font-mono">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</td>
                <td className="p-3">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onLoadToDeck(track, 'A')}
                      className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded text-xs font-bold hover:bg-blue-600 hover:text-white"
                    >
                      Load A
                    </button>
                    <button 
                      onClick={() => onLoadToDeck(track, 'B')}
                      className="px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded text-xs font-bold hover:bg-red-600 hover:text-white"
                    >
                      Load B
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
