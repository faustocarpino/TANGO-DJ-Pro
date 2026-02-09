
import React from 'react';
import { Knob } from './Knob';
import { DeckState, MixerState } from '../types';

interface MixerProps {
  deckA: DeckState;
  deckB: DeckState;
  mixer: MixerState;
  onUpdateDeckA: (s: Partial<DeckState>) => void;
  onUpdateDeckB: (s: Partial<DeckState>) => void;
  onUpdateMixer: (s: Partial<MixerState>) => void;
}

export const Mixer: React.FC<MixerProps> = ({ deckA, deckB, mixer, onUpdateDeckA, onUpdateDeckB, onUpdateMixer }) => {
  return (
    <div className="w-72 bg-zinc-900 border-x border-zinc-800 flex flex-col p-4 shadow-2xl z-10">
      <div className="text-center mb-6">
        <h3 className="text-[10px] font-bold text-zinc-600 tracking-[0.2em] uppercase">Master Output</h3>
        <div className="h-2 bg-zinc-950 rounded flex gap-0.5 p-0.5 mt-2">
           <div className="flex-1 bg-green-500 rounded-sm opacity-50" />
           <div className="flex-1 bg-green-500 rounded-sm" />
           <div className="flex-1 bg-yellow-500 rounded-sm" />
           <div className="flex-1 bg-red-500 rounded-sm opacity-20" />
        </div>
      </div>

      <div className="flex justify-around mb-8">
        <div className="flex flex-col gap-4">
          <Knob label="High" value={deckA.eq.high} min={-12} max={12} onChange={(v) => onUpdateDeckA({ eq: { ...deckA.eq, high: v } })} color="blue" />
          <Knob label="Mid" value={deckA.eq.mid} min={-12} max={12} onChange={(v) => onUpdateDeckA({ eq: { ...deckA.eq, mid: v } })} color="blue" />
          <Knob label="Low" value={deckA.eq.low} min={-12} max={12} onChange={(v) => onUpdateDeckA({ eq: { ...deckA.eq, low: v } })} color="blue" />
        </div>
        <div className="w-px bg-zinc-800 mx-2" />
        <div className="flex flex-col gap-4">
          <Knob label="High" value={deckB.eq.high} min={-12} max={12} onChange={(v) => onUpdateDeckB({ eq: { ...deckB.eq, high: v } })} color="red" />
          <Knob label="Mid" value={deckB.eq.mid} min={-12} max={12} onChange={(v) => onUpdateDeckB({ eq: { ...deckB.eq, mid: v } })} color="red" />
          <Knob label="Low" value={deckB.eq.low} min={-12} max={12} onChange={(v) => onUpdateDeckB({ eq: { ...deckB.eq, low: v } })} color="red" />
        </div>
      </div>

      <div className="flex-1 flex justify-around mb-8">
        <div className="relative h-48 w-8 bg-zinc-950 rounded-lg flex flex-col-reverse p-1 border border-zinc-800">
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={deckA.volume}
            onChange={(e) => onUpdateDeckA({ volume: Number(e.target.value) })}
            style={{ 
              appearance: 'none',
              transform: 'rotate(-90deg)',
              width: '180px',
              position: 'absolute',
              top: '80px',
              left: '-76px',
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="relative h-48 w-8 bg-zinc-950 rounded-lg flex flex-col-reverse p-1 border border-zinc-800">
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={deckB.volume}
            onChange={(e) => onUpdateDeckB({ volume: Number(e.target.value) })}
            style={{ 
              appearance: 'none',
              transform: 'rotate(-90deg)',
              width: '180px',
              position: 'absolute',
              top: '80px',
              left: '-76px',
            }}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-center mb-2">
          <span className="text-[10px] text-zinc-500 font-bold uppercase">Crossfader</span>
        </div>
        <div className="relative bg-zinc-950 h-10 rounded-xl border border-zinc-800 flex items-center px-4">
          <input 
            type="range"
            min="-1"
            max="1"
            step="0.01"
            value={mixer.crossfader}
            onChange={(e) => onUpdateMixer({ crossfader: Number(e.target.value) })}
            className="w-full crossfader appearance-none bg-zinc-900 h-1.5 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
