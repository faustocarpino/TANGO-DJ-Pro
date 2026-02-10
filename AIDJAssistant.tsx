
import React, { useState, useEffect } from 'react';
import { Track } from '../types';
import { getAITrackSuggestions, getTransitionAdvice } from 'geminiService';

interface AIDJAssistantProps {
  currentTracks: (Track | null)[];
}

export const AIDJAssistant: React.FC<AIDJAssistantProps> = ({ currentTracks }) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const refreshAI = async () => {
    setLoading(true);
    try {
      const sugs = await getAITrackSuggestions(currentTracks, [90, 130]);
      setSuggestions(sugs);
      
      if (currentTracks[0] && currentTracks[1]) {
        const adv = await getTransitionAdvice(currentTracks[0], currentTracks[1]);
        setAdvice(adv);
      } else {
        setAdvice("Load two tracks to get transition advice.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentTracks[0] || currentTracks[1]) {
      refreshAI();
    }
  }, [currentTracks[0]?.id, currentTracks[1]?.id]);

  return (
    <div className="w-80 h-full bg-zinc-900 border-l border-zinc-800 flex flex-col p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <i className="fa-solid fa-wand-magic-sparkles text-purple-500" />
          AI DJ SENSEI
        </h3>
        <button 
          onClick={refreshAI}
          disabled={loading}
          className="text-zinc-500 hover:text-white disabled:opacity-50"
        >
          <i className={`fa-solid fa-rotate ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide">
        <section>
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Transition Strategy</h4>
          <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-sm text-zinc-300 leading-relaxed italic">
            {loading ? "Thinking..." : advice}
          </div>
        </section>

        <section>
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Vibe Suggestions</h4>
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse flex gap-3 items-center">
                  <div className="w-10 h-10 bg-zinc-800 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-zinc-800 rounded w-3/4" />
                    <div className="h-2 bg-zinc-800 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : suggestions.length > 0 ? (
              suggestions.map((s, idx) => (
                <div key={idx} className="group p-3 bg-zinc-800/30 rounded-xl border border-transparent hover:border-purple-500/50 hover:bg-zinc-800/60 transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-bold text-zinc-200">{s.title}</div>
                    <i className="fa-solid fa-plus text-[10px] text-zinc-600 group-hover:text-purple-400" />
                  </div>
                  <div className="text-xs text-zinc-500 mb-2">{s.artist}</div>
                  <div className="text-[10px] text-zinc-400 line-clamp-2">{s.reason}</div>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-600 italic">No suggestions yet. Load tracks to start.</p>
            )}
          </div>
        </section>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-800">
        <div className="flex items-center gap-2 text-[10px] text-zinc-600">
          <i className="fa-solid fa-circle-info" />
          Powered by Gemini 3 Flash
        </div>
      </div>
    </div>
  );
};
