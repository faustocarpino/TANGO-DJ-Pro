
import React, { useState, useEffect } from 'react';
import { Deck } from './components/Deck';
import { Mixer } from './components/Mixer';
import { Library } from './components/Library';
import { AIDJAssistant } from './components/AIDJAssistant';
import { Track, DeckState, MixerState } from './types';
import { INITIAL_DECK_STATE } from './constants';

const App: React.FC = () => {
  const [deckA, setDeckA] = useState<DeckState>({ ...INITIAL_DECK_STATE });
  const [deckB, setDeckB] = useState<DeckState>({ ...INITIAL_DECK_STATE });
  const [mixer, setMixer] = useState<MixerState>({ crossfader: 0, masterVolume: 0.8 });
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running as standalone app
    const standalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(!!standalone);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (deckA.isPlaying && deckA.track) {
        setDeckA(prev => {
          const nextTime = prev.currentTime + 1 * prev.pitch;
          const duration = prev.track?.duration || 0;
          return {
            ...prev,
            currentTime: Math.min(nextTime, duration),
            isPlaying: nextTime >= duration ? false : true
          };
        });
      }
      if (deckB.isPlaying && deckB.track) {
        setDeckB(prev => {
          const nextTime = prev.currentTime + 1 * prev.pitch;
          const duration = prev.track?.duration || 0;
          return {
            ...prev,
            currentTime: Math.min(nextTime, duration),
            isPlaying: nextTime >= duration ? false : true
          };
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [deckA.isPlaying, deckA.track, deckA.pitch, deckB.isPlaying, deckB.track, deckB.pitch]);

  const loadToDeck = (track: Track, deck: 'A' | 'B') => {
    const update = { track, currentTime: 0, isPlaying: false };
    if (deck === 'A') setDeckA(prev => ({ ...prev, ...update }));
    else setDeckB(prev => ({ ...prev, ...update }));
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#0a0a0c] text-zinc-100 overflow-hidden select-none">
      {/* PWA Install Hint */}
      {!isStandalone && (
        <div className="bg-blue-600/90 text-white py-2 px-4 text-center text-xs font-bold animate-pulse backdrop-blur-md sticky top-0 z-50">
          <i className="fa-solid fa-arrow-up-from-bracket mr-2"></i>
          Tap "Share" and "Add to Home Screen" for the full Native iPad experience!
        </div>
      )}

      {/* Header Bar */}
      <header className="h-14 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between px-6 backdrop-blur-md safe-padding-top">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
             <i className="fa-solid fa-bolt text-white" />
          </div>
          <h1 className="text-lg font-black tracking-tighter uppercase italic">Gemini DJ <span className="text-blue-500">Pro</span></h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1"><i className="fa-solid fa-wifi text-green-500" /> Online</span>
            <span className="flex items-center gap-1"><i className="fa-solid fa-battery-three-quarters" /> 84%</span>
            <span className="text-zinc-300">22:45:01</span>
          </div>
          <button className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-700 text-sm flex items-center gap-2">
            <i className="fa-solid fa-gear" /> Settings
          </button>
        </div>
      </header>

      {/* Main DJ Surface */}
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Decks & Mixer Row */}
          <div className="flex h-[50%] p-2 gap-2">
            <Deck id="A" state={deckA} onUpdate={(s) => setDeckA(p => ({ ...p, ...s }))} />
            <Mixer 
              deckA={deckA} 
              deckB={deckB} 
              mixer={mixer} 
              onUpdateDeckA={(s) => setDeckA(p => ({ ...p, ...s }))}
              onUpdateDeckB={(s) => setDeckB(p => ({ ...p, ...s }))}
              onUpdateMixer={(s) => setMixer(p => ({ ...p, ...s }))}
            />
            <Deck id="B" state={deckB} onUpdate={(s) => setDeckB(p => ({ ...p, ...s }))} />
          </div>

          {/* Library Row */}
          <div className="flex-1 flex overflow-hidden">
            <Library onLoadToDeck={loadToDeck} />
          </div>
        </div>

        {/* AI Sidebar - Integrated but collapsable on smaller screens if needed */}
        <div className="hidden lg:block">
          <AIDJAssistant currentTracks={[deckA.track, deckB.track]} />
        </div>
      </main>

      {/* Mobile/iPad Bottom Bar */}
      <footer className="h-16 bg-zinc-900 border-t border-zinc-800 px-4 flex items-center justify-between safe-padding-bottom">
        <div className="flex gap-4">
           <button className="text-zinc-500 hover:text-white px-3 py-1 bg-zinc-800 rounded border border-zinc-700 text-xs font-bold flex items-center gap-2">
             <i className="fa-solid fa-list-ul" /> Playlists
           </button>
           <button className="text-zinc-500 hover:text-white px-3 py-1 bg-zinc-800 rounded border border-zinc-700 text-xs font-bold flex items-center gap-2">
             <i className="fa-solid fa-wand-magic-sparkles" /> AI Mix
           </button>
        </div>

        <div className="flex items-center gap-8">
           <div className="flex flex-col items-center">
             <span className="text-[10px] text-zinc-600 font-bold uppercase mb-1">Master Volume</span>
             <div className="w-64 h-2 bg-zinc-950 rounded-full overflow-hidden relative border border-zinc-800 shadow-inner">
               <div className="h-full bg-gradient-to-r from-blue-700 to-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]" style={{ width: '80%' }} />
             </div>
           </div>
        </div>

        <div className="flex gap-4">
           <button className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#1DB954]">
             <i className="fa-brands fa-spotify fa-xl" />
           </button>
           <button className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#FA2D48]">
             <i className="fa-brands fa-apple fa-xl" />
           </button>
           <button className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 border border-red-900/40 flex items-center justify-center font-bold text-xs uppercase shadow-[0_0_15px_rgba(239,68,68,0.2)]">
             REC
           </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
